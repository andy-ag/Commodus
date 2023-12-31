import pandas as pd
import numpy as np
import json
import sys
from statsmodels.tsa.stattools import acf, pacf, adfuller

# Read input data from standard input
data = json.load(sys.stdin)

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
        print('No column with "USD" found. Using the second column as "Value".')
        df['Value'] = df.iloc[:, 1]

# Handle nulls, coerce to numeric as a safety measure
df['Value'] = pd.to_numeric(df['Value'], errors='coerce')
df['Value'] = df['Value'].fillna(method='ffill')
df['Value'] = df['Value'].fillna(method='bfill')
df['Value'] = df['Value'].fillna(0)

df = df[["Date", "Value"]].set_index("Date").sort_index()

# Compute MA smoothed time series
df['MA_Smoothed'] = df['Value'].rolling(window=3).mean()

# Compute ACF and PACF
nobs = len(df["Value"])
# Package calculates lag ceiling using nobs // 2, for strict inequality -1 is always needed
# Going above 16 lags isnt particularly informative
lags = min((nobs // 2) - 1, 16)   
acf_values = acf(df["Value"], nlags=lags)
pacf_values = pacf(df["Value"], nlags=lags)

# Compute statistics
mean = df['Value'].mean()
std_dev = df['Value'].std()
variance = df['Value'].var()
adf_result = adfuller(df['Value'])
statistics = {
    "Mean": mean,
    "Standard deviation": std_dev,
    "Variance": variance,
    "ADF test statistic": adf_result[0],
    "p-value": adf_result[1]
}

# Compute delay plot values
# Compute Delay plots
delay_plots = {}
for tau in range(1, 13): # tau values from 1 to 12
    delay_plots[str(tau)] = {
        "x": df['Value'].iloc[:-tau].tolist(), # x(t-tau)
        "y": df['Value'].iloc[tau:].tolist()  # x(t)
    }



#Fill NaN values for JSON compatibility
df['Value'].fillna(0, inplace=True)

# Prepare output data
output_data = {
    "raw_time_series": {
        "dates": df.index.strftime('%Y-%m-%d').tolist(),
        "values": df["Value"].tolist()
    },
    "acf_plot": {
        "lags": list(range(len(acf_values))),
        "acf_values": acf_values.tolist()
    },
    "pacf_plot": {
        "lags": list(range(len(pacf_values))),
        "pacf_values": pacf_values.tolist()
    },
    "ma_smoothed": {
        "dates": df[df['MA_Smoothed'].notna()].index.strftime('%Y-%m-%d').tolist(),
        "values": df[df['MA_Smoothed'].notna()]["MA_Smoothed"].tolist()
    },
    "delay_plots": delay_plots,
    "statistics": statistics,
    "frequency": frequency,
}

# Write output data
json.dump(output_data, sys.stdout)
