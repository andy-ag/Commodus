import './Table.css'

const statNameMapping = {
    "cointegration": "Engle-Granger test for cointegration",
    "mutual_information": "Mutual information",
    "covariance": "Covariance"
};

export default function StatsTable({stats}) {
    return (
        <table className="table table-striped my-3">
            <thead>
                <tr>
                    <th className='text-center'>Statistic</th>
                    <th className='text-center'>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(stats).map(([statName, statValue]) => (
                    statName !== 'frequency' &&
                    <tr key={statName}>
                        <td className='text-center'>{statNameMapping[statName] || statName}</td>
                        <td className='text-center'>{Number.isFinite(statValue) ? statValue.toFixed(3) : statValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
