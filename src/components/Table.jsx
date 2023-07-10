import { Link } from 'react-router-dom'

export default function Table({commodities}) {
    let day, week, month, year
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Day</th>
                    <th>Week</th>
                    <th>Month</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                {commodities && commodities.map((commodity, idx) => (
                    <tr>
                        <td>{commodity.name}</td>
                        <td>{commodity.timeSeries[0][1]}</td>
                        <td>{day}</td>
                        <td>{week}</td>
                        <td>{month}</td>
                        <td>{year}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}