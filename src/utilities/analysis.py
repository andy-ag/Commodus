import pandas as pd
import numpy as np
import json
import sys
from statsmodels.tsa.stattools import acf, pacf, adfuller
from statsmodels.tsa.seasonal import seasonal_decompose

# Read input data from standard input
data = json.load(sys.stdin)

# Convert to DataFrame
df = pd.DataFrame(data["timeSeries"], columns=["Date", "Value"])
df["Date"] = pd.to_datetime(df["Date"])
df = df.set_index("Date").sort_index()

# Compute MA smoothed time series
df['MA_Smoothed'] = df['Value'].rolling(window=3).mean()

# Compute ACF and PACF
nobs = len(df["Value"])
# Package calculates lag ceiling using nobs // 2, for strict inequality -1 is always needed
lags = (nobs // 2) - 1   
acf_values = acf(df["Value"], nlags=lags)
pacf_values = pacf(df["Value"], nlags=lags)

# Perform time series decomposition
decomposition = seasonal_decompose(df['Value'], model='additive', period=1)

# Compute statistics
mean = df['Value'].mean()
variance = df['Value'].var()
adf_result = adfuller(df['Value'])
statistics = {
    "Mean": mean,
    "Variance": variance,
    "ADF Statistic": adf_result[0],
    "p-value": adf_result[1]
}

#Fill NaN values for JSON compatibility
df.fillna(0, inplace=True)

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
        "dates": df.index.strftime('%Y-%m-%d').tolist(),
        "values": df["MA_Smoothed"].tolist()
    },
    "decomposition_data": {
        "dates": df.index.strftime('%Y-%m-%d').tolist(),
        "observed": decomposition.observed.tolist(),
        "trend": decomposition.trend.tolist(),
        "seasonal": decomposition.seasonal.tolist(),
        "residual": decomposition.resid.tolist()
    },
    "statistics": statistics
}

# Write output data
json.dump(output_data, sys.stdout)
