import pandas as pd
import numpy as np
import json
import sys
from sklearn.feature_selection import mutual_info_regression
from statsmodels.tsa.stattools import coint, grangercausalitytests

def preprocess_data(data):
    # Extract info
    frequency = data['frequency']
    column_names = data['colNames']
    data_rows = data['timeSeries']

    # Convert to DataFrame
    df = pd.DataFrame(data_rows, columns=column_names)
    df["Date"] = pd.to_datetime(df["Date"])

    # If more than two columns, select the first one that contains 'USD'
    if len(df.columns) > 2:
        value_cols = [col for col in df.columns if 'USD' in col]
        if value_cols:
            df['Value'] = df[value_cols[0]]
        else:
            sys.stderr.write('No column with "USD" found. Using the second column as "Value".\n')
            df['Value'] = df.iloc[:, 1]

    # Handle nulls, coerce to numeric as a safety measure
    df['Value'] = pd.to_numeric(df['Value'], errors='coerce')
    df['Value'] = df['Value'].fillna(method='ffill')
    df['Value'] = df['Value'].fillna(method='bfill')
    df['Value'] = df['Value'].fillna(0)

    df = df[["Date", "Value"]].set_index("Date").sort_index()
    return df

# Read input data from standard input
data = json.load(sys.stdin)

# Preprocess time series data
df1 = preprocess_data(data['data1'])
df2 = preprocess_data(data['data2'])

# Merge the dataframes on the Date column
df = pd.merge(df1, df2, on='Date', how='inner')

# Compute mutual information
mutual_info = mutual_info_regression(df.iloc[:, 0].values.reshape(-1, 1), df.iloc[:, 1])

# Compute correlation
correlation = df.iloc[:, 0].corr(df.iloc[:, 1])

# Perform Engle-Granger test for cointegration
eg_test = coint(df.iloc[:, 0], df.iloc[:, 1])

# Perform Granger causality test
gc_test = grangercausalitytests(df, maxlag=5, verbose=False)

# Prepare output data
output_data = {
    "frequency": {
        "1": data['data1']['frequency'],
        "2": data['data2']['frequency'],
    },
    "cointegration": {
        "test_stat": eg_test[0],
        "critical_values": {
            "1%": eg_test[2][0],
            "5%": eg_test[2][1],
            "10%": eg_test[2][2],
        }
    },
    "granger_causality": {
        "test_stat": gc_test[1][0]['ssr_ftest'][0],
        "p": gc_test[5][0]['ssr_ftest'][1],
    },
    "mutual_information": mutual_info[0],
    "correlation": correlation,
}

# Write output data
json.dump(output_data, sys.stdout)