import './StatsTable.css'
import InfoBox from './InfoBox';

export default function StatsTable({stats}) {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <table className="table my-3 w-50">
                    <thead>
                        <tr>
                            <th colSpan="2" className='text-center'>
                            <InfoBox selectedAnalysis="Granger causality" /> Granger causality test
                            </th>
                        </tr>
                        <tr>
                            <th className='text-center'>
                            <InfoBox selectedAnalysis="Statistical testing" /> Test statistic
                            </th>
                            <th className='text-center'>
                            <InfoBox selectedAnalysis="p-value" /> p-value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'>{stats.granger_causality.test_stat.toFixed(3)}</td>
                            <td className='text-center'>{stats.granger_causality.p.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table my-3 w-50">
                    <thead>
                        <tr>
                            <th colSpan="4" className='text-center'>
                            <InfoBox selectedAnalysis="Cointegration" /> Engle-Granger cointegration test
                            </th>
                        </tr>
                        <tr>
                            <th className='text-center'>
                            <InfoBox selectedAnalysis="Statistical testing" /> Test statistic
                            </th>
                            <th colSpan="3" className='text-center'>
                            <InfoBox selectedAnalysis="Critical values" /> Critical values
                            </th>
                        </tr>
                        <tr>
                            <th className='text-center'></th>
                            <th className='text-center'>1%</th>
                            <th className='text-center'>5%</th>
                            <th className='text-center'>10%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'>{stats.cointegration.test_stat.toFixed(3)}</td>
                            <td className='text-center'>{stats.cointegration.critical_values['1%'].toFixed(3)}</td>
                            <td className='text-center'>{stats.cointegration.critical_values['5%'].toFixed(3)}</td>
                            <td className='text-center'>{stats.cointegration.critical_values['10%'].toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <table className="table my-3 mb-5 w-50">
                    <thead>
                        <tr>
                            <th colSpan="2" className='text-center'>Other statistics</th>
                        </tr>
                        <tr>
                            <th className='text-start'>Statistic</th>
                            <th className='text-start'>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-start'>
                            <InfoBox selectedAnalysis="Correlation" /> Correlation
                            </td>
                            <td className='text-start'>{stats.correlation.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td className='text-start'>
                            <InfoBox selectedAnalysis="Mutual information" /> Mutual information
                            </td>
                            <td className='text-start'>{stats.mutual_information.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
