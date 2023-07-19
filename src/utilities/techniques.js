const techniques = {
    "Time series": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Time_series'>raw time series</a> data is the original set of values, captured as a time-ordered sequence. This is the most direct representation of the data, and many analyses start with this basic format. Depending on the nature of the data, the time series can reveal trends, patterns, and outliers that may not be apparent in processed or summarized data, and can provide an intuitive feel for what steps to take next.",
    },
    "Moving average": {
      "description": "A <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Moving_average'>moving average (MA)</a>, also sometimes referred to as a rolling window, is a widely used method for smoothing time series data to see higher-level trends over time. By calculating the average price over a specified period, the method helps to filter out noise and highlight the core underlying trend. Moving averages are commonly used in finance, economics, and weather forecasting.",
    },
    "Autocorrelation function": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Autocorrelation'>autocorrelation function (ACF)</a> plots the measure of the correlation between the time series and a lagged version of itself. It is used to identify the presence of a repeating pattern in the data, one that may be otherwise be obscured by noise.",
    },
    "Partial autocorrelation function": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Partial_autocorrelation_function'>partial autocorrelation function (PACF)</a> gives the partial correlation of a time series with its own lagged values, controlling for the values of the time series at all shorter lags. It is particularly useful in the identification of the order of an autoregressive model. The PACF helps us understand the direct relationship between an observation and its lag, which can provide insights into the underlying structure and dynamics of the time series.",
    },
    "Delay plot": {
      "description": "A <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Recurrence_plot'>delay plot</a> is a tool for visually inspecting a time-series for the potential presence of periodic, non-linear patterns. It plots the value at time t against the value at time t-x (where x is a chosen delay). If the plot exhibits a clear structure or pattern, it suggests that the time series is periodic or cyclic.",
    },
    "Granger causality": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Granger_causality'>Granger causality</a> is a statistical concept applied in the field of time-series forecasting. If a signal x1 is said to 'Granger-cause' a signal x2, then past values of x1 contain information that helps predict future values of x2 (without necessarily causing the change in x2 directly). This concept is widely used in econometrics to test whether one time series can be useful in forecasting another.",
    },
    "Cointegration": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Cointegration'>Cointegration</a> is a statistical property of two or more time series that indicates a shared long-term trend. This means that while the individual series themselves may be non-stationary (i.e., their statistical properties change over time), a linear combination of them is stationary. This implies a stable, long-term relationship between the series. Cointegration is a fundamental concept in the analysis and modelling of non-stationary time series data.",
    },    
    "Correlation": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Correlation'>Correlation</a> is a statistical measure that describes the degree to which two variables move in relation to each other. If the correlation is positive, the variables tend to increase or decrease together, while if it's negative, one variable tends to increase when the other decreases. Correlation can be used to summarize the strength and direction of linear relationships between pairs of variables, and is often a reasonable starting point for deeper analysis.",
    },
    "Mutual information": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Mutual_information'>Mutual information</a> is a measure of the mutual dependence between two variables. Unlike correlation, which only captures linear relationships, mutual information can capture non-linear dependencies between variables. It is used in a wide range of fields including machine learning, statistics, and information theory.",
    },
    "Statistical testing": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Statistical_hypothesis_testing'>Statistical testing</a> involves the interrogation of formally-defined mathematical hypotheses about a set of data. It is widely used in research to make inferences or predictions about a population based on a sample of data, and is one of the fundamental building blocks of modern science .",
    },
    "Mean": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Arithmetic_mean'>mean</a> is the average of a set of numerical values, calculated by adding them together and dividing by the number of terms in the set. It is a basic concept in mathematics and statistics, used as a measure of central tendency to provide an initial insight into a dataset.",
    },
    "Standard deviation": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Standard_deviation'>standard deviation</a> is a measure of the variation or dispersion in a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range.",
    },
    "Variance": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Variance'>Variance</a> is the expectation of the squared deviation of a random variable from its mean. It is a key measure in statistics, used to quantify the spread of data points. A variance of zero indicates that all the values are identical, while a high variance indicates the data points are very spread out from the mean, and from each other.",
    },
    "ADF test statistic": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test'>Augmented Dickey–Fuller (ADF) test</a> is used to check whether a time series is stationary (i.e. its properties do not depend on the time at which the series is observed).",
    },
    "p-value": {
      "description": "The <a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/P-value'>p-value</a> is a statistical measure that helps us understand the significance of our results. It is used in the context of hypothesis testing to help us make decisions - if the p-value is less than a chosen significance level (e.g., 0.05), we reject the null hypothesis. The smaller the p-value, the stronger the evidence that we should reject the null hypothesis. It is a critical concept in statistical hypothesis testing.",
    },
    "Critical values": {
      "description": "<a target='blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/Critical_value'>Critical values</a> are points at the extremes of a given probability distribution, and are used to test statistical hypotheses. They divide the range of a probability distribution into acceptance and rejection regions, by confidence level. If a calculated test statistic falls beyond a chosen critical value, we reject the null hypothesis. Critical values are a core concept in statistical hypothesis testing.",
    },
    "All commodities": {
      "description": "The table below displays the latest information gathered from the NASDAQ commodities API. The service offers daily data for Gold, Silver, and the OPEC reference basket, and monthly data for all other commodities. To see time series plots for a given commodity, as well as a suite of exploratory data analysis options, please click its name in the table.",
    },
    "Compare": {
      "description": "To view overlayed plots of two commodities, select them using the drop-down lists. Please note that the plot will only display once both commodities have been chosen. To run a suite of statistical tests exploring the relationship between the chosen commodities, click the 'Analyse' button. If you have changed either of the selected commodities, please click the button again to update the analysis.",
    },
  }
  
  module.exports = techniques  
  
  