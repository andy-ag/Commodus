const techniques = {
    "Time series": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Time_series'>raw time series</a> data is the original sequence of values as it was captured in the time-ordered sequence. This is the most direct representation of the data, and many analyses start with this raw format. Depending on the nature of the data, the raw time series can reveal trends, patterns, and outliers that may not be apparent in processed or summarized data.",
    },
    "Moving average": {
      "description": "A <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Moving_average'>moving average (MA)</a> is a widely used method for smoothing time series data to see trends over time. By calculating the average price over a specified period, it helps to filter out noise and highlight the underlying trend. It's commonly used in finance, economics, and weather forecasting.",
    },
    "Autocorrelation function": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Autocorrelation'>autocorrelation function (ACF)</a> is a measure of the correlation between the time series with a lagged version of itself. It's used to identify the presence of a repeating pattern or seasonality in the data. For example, in sales data, there might be higher sales in certain months due to seasonality which can be detected using ACF.",
    },
    "Partial autocorrelation function": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Partial_autocorrelation_function'>partial autocorrelation function (PACF)</a> gives the partial correlation of a time series with its own lagged values, controlling for the values of the time series at all shorter lags. It helps in identifying the order of an autoregressive model. For instance, in stock price prediction, PACF can help determine how many previous days' prices you should consider to predict the current day's price.",
    },
    "Delay plot": {
      "description": "A <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Recurrence_plot'>delay plot</a> is a tool for visually inspecting the periodicity or delay in time series data. It plots the value at time t against the value at time t-x (where x is a chosen delay). If the plot shows a structure or pattern, it suggests that the time series is periodic or cyclic.",
    },
    "Granger causality": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Granger_causality'>Granger causality</a> is a statistical concept of causality that says if a signal X1 'Granger-causes' a signal X2, then past values of X1 should contain information that helps predict X2. It's widely used in econometrics to test whether one time series is useful in forecasting another.",
    },
    "Cointegration": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Cointegration'>Cointegration</a> is a statistical property of time series variables which share a common long-term trend. It's a tool for testing the correlation between non-stationary time series data. For example, in finance, if two stocks are cointegrated, it means they move together over the long run, and this relationship can be exploited for pair trading strategies.",
    },
    "Correlation": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Correlation_and_dependence'>Correlation</a> is a statistical measure that describes the degree to which two variables move in relation to each other. It's widely used in finance, physics, and social sciences to understand the relationship between variables. For instance, in finance, the correlation between the price of different stocks is used to diversify a portfolio.",
    },
    "Mutual information": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Mutual_information'>Mutual information</a> is a measure of the mutual dependence between two variables. Unlike correlation, which only captures linear relationships, mutual information can capture any kind of relationship between variables. It's used in a wide range of fields including machine learning, statistics, and information theory.",
    },
    "Statistical testing": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Statistical_hypothesis_testing'>Statistical testing</a> is a hypothesis that is tested for possible rejection under the presumption that it is true (usually that observations are the result of chance). It's widely used in research to make inferences or predictions about a population based on a sample of data.",
    },
    "Mean": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Arithmetic_mean'>mean</a> is the average of a set of numerical values, calculated by adding them together and dividing by the number of terms in the set. It's a basic concept in mathematics and statistics, used as a measure of central tendency to summarize a dataset.",
    },
    "Standard deviation": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Standard_deviation'>standard deviation</a> is a measure of the amount of variation or dispersion in a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range.",
    },
    "Variance": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Variance'>Variance</a> is the expectation of the squared deviation of a random variable from its mean. It's a key measure in statistics to quantify the spread of data points. A variance of zero indicates that all the values are identical, while a high variance indicates the data points are very spread out from the mean, and from each other.",
    },
    "ADF test statistic": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test'>Augmented Dickey–Fuller (ADF) test statistic</a> is used in the test for a unit root in a time series sample. It's a common way to test whether a time series is stationary (i.e., its properties do not depend on the time at which the series is observed).",
    },
    "ADF test p-value": {
      "description": "The p-value in the ADF test tells us the significance of the <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test'>Augmented Dickey–Fuller test statistic</a>. If the p-value is less than a chosen significance level (like 0.05), we reject the null hypothesis of the presence of a unit root. This means we can consider the time series to be stationary.",
    },
  }
  
  module.exports = techniques  
  