import './Table.css'
import { Link } from 'react-router-dom'

export default function Table({commodities}) {
    function getDayChange(timeSeries, frequency) {
        if (frequency === 'daily' && timeSeries.length >= 2) {
            return (timeSeries[0][1] - timeSeries[1][1]).toFixed(2);
        }
        return '-';
    }
    
    function getWeekChange(timeSeries, frequency) {
        if (frequency === 'daily' && timeSeries.length >= 5) {
            return (timeSeries[0][1] - timeSeries[4][1]).toFixed(2);
        }
        return '-';
    }
    
    function getMonthChange(timeSeries, frequency) {
        const unitsInMonth = frequency === 'daily' ? 21 : 1;
        if (timeSeries.length >= unitsInMonth) {
            return (timeSeries[0][1] - timeSeries[unitsInMonth][1]).toFixed(2);
        }
        return '-';
    }
    
    function getYearChange(timeSeries, frequency) {
        const unitsInYear = frequency === 'daily' ? 260 : 12;
        if (timeSeries.length >= unitsInYear) {
            return (timeSeries[0][1] - timeSeries[unitsInYear-1][1]).toFixed(2);
        }
        return '-';
    }
    return (
        <table className="table table-striped my-3">
            <thead>
                <tr>
                    <th className='text-start'>Name</th>
                    <th className='text-end'>Price</th>
                    <th className='text-end'>Day</th>
                    <th className='text-end'>Week</th>
                    <th className='text-end'>Month</th>
                    <th className='text-end'>Year</th>
                </tr>
            </thead>
            <tbody>
                {commodities && commodities.map((commodity, idx) => {
                console.log(`Commodity at index ${idx}:`, commodity);
                return (
                    <tr key={idx}>
                        <td className='text-start'><Link className="table-link" to={`/commodities/${encodeURIComponent(commodity._doc.apiParams)}`}>{commodity._doc.name}</ Link></td>
                        <td className='text-end'>{(commodity.timeSeries[0][1]).toFixed(2)}</td>
                        <td className='text-end'>{getDayChange(commodity.timeSeries, commodity._doc.frequency)}</td>
                        <td className='text-end'>{getWeekChange(commodity.timeSeries, commodity._doc.frequency)}</td>
                        <td className='text-end'>{getMonthChange(commodity.timeSeries, commodity._doc.frequency)}</td>
                        <td className='text-end'>{getYearChange(commodity.timeSeries, commodity._doc.frequency)}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    );
}