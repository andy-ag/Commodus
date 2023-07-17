import './FaqPage.css';
import HeaderBox from '../../components/HeaderBox.jsx'

export default function FaqPage() {
    return (
      <div className="container my-4 w-50">
            <div className="row">
            <div className="col text-start">
                    <div className="d-flex justify-content-center mb-4">
                        <HeaderBox text={'FAQ'} add={false} fav={false}/>
                    </div> 
                    <h2>What is the purpose of the Commodus app?</h2>
                    <p>
                      The Commodus app serves as a resource for basic commodity price analytics and quick trend monitoring. It is designed to be used as a tool for exploratory data analysis, providing a suite of strong core insights into the commodity markets. Additionally, the app aims to make analysis accessible to a wider audience. By offering an easy-to-use interface, less technically oriented users can access relatively complex data analysis tools, empowering them to create a solid platform for further independent research.
                    </p>

                    <h2>What data sources does the Commodus app use?</h2>
                    <p>
                      The primary data source for the Commodus app is the Nasdaq API, which provides real-time and historical market data for a wide array of commodities. However, we are continuously exploring other data sources to broaden the scope of our analyses and provide more accurate and comprehensive insights.
                    </p>

                    <h2>What kind of analysis does the Commodus app provide?</h2>
                    <p>
                      The Commodus app integrates several core techniques of statistical time-series analysis and applies them to commodity data. We place an increased emphasis on exploratory tools that can help users gain a better initial insight into the time-dependent structure of commodity prices.
                    </p>

                    <h2>Can I export the data and analysis for offline use?</h2>
                    <p>
                    Yes, the underlying data for a given commodity, as well as the data used to construct all the plots can be downloaded in either a JSON or CSV format by clicking the download icon on a commodity's detail page or on your dashboard.
                    </p>
                </div>
          </div>
      </div>
    );
}
