import InfoBox from './InfoBox.jsx';

export default function CommodityTable({ statistics, rawTimeSeries }) {
  const latestObservation = rawTimeSeries.values[rawTimeSeries.values.length - 1];
  const decimalPlaces = {
    "Latest value": 2,
    "Mean": 2,
    "Variance": 0,
    "Standard deviation": 2,
    "ADF test statistic": 3,
    "p-value": 3
  };

  return (
    <div className="d-flex justify-content-center">
        <table className="table my-3 mb-5 w-50">
        <thead>
            <tr>
            <th className='text-start'>Statistic</th>
            <th className='text-start'>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className='text-start'>Latest value</td>
            <td className='text-start'>{latestObservation.toFixed(decimalPlaces['Latest value'])}</td>
            </tr>
            {Object.entries(statistics).map(([statistic, value], idx) => (
            <tr key={idx}>
                <td className='text-start'>
                <InfoBox selectedAnalysis={statistic} /> {statistic}
                </td>
                <td className='text-start'>{value.toFixed(decimalPlaces[statistic])}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}
