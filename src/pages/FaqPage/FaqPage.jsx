import './FaqPage.css';

export default function FaqPage() {
    return (
      <div className="container my-4 w-50">
            <div className="row">
            <div className="col text-start">
                    <h1 className="mb-4">FAQ</h1>
                    <h2>What is the purpose of the Commodus app?</h2>
                    <p>
                      The Commodus app serves as a resource for basic commodity price analytics and quick trend monitoring. It is designed to be used as a precursor to deeper analysis, providing a suite of strong core insights into the commodity markets. Additionally, the app aims to make analysis accessible to a wider audience. By offering an easy-to-use interface, less technically oriented users can access relatively complex data analysis tools, empowering them to create a solid platform for further independent research.
                    </p>

                    <h2>What data sources does the Commodus app use?</h2>
                    <p>
                      The primary data source for the Commodus app is the Nasdaq API, which provides real-time and historical market data for a wide array of commodities. However, we are continuously exploring other data sources to broaden the scope of our analyses and provide more accurate and comprehensive insights.
                    </p>

                    <h2>What kind of analysis does the Commodus app provide?</h2>
                    <p>
                      The Commodus app integrates several core techniques of statistical time-series and applies them to commodity data. This includes moving averages, autocorrelation functions, partial autocorrelation functions, and other methods that can help users gain a better insight into the time-dependent structure of commodity prices.
                    </p>

                    <h2>Can I export the data and analysis for offline use?</h2>
                    <p>
                    Currently, the Commodus app does not support data and analysis export for offline use. However, we recognise the value of this feature for many users and are actively exploring the possibility of adding it in a future update.
                    </p>
                </div>
          </div>
      </div>
    );
}
