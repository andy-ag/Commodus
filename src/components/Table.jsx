import { Link } from 'react-router-dom'

export default function Table({data}) {
    let name, price, day, week, month, year, freq
    
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
                <tr>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{day}</td>
                    <td>{week}</td>
                    <td>{month}</td>
                    <td>{year}</td>
                </tr>
            </tbody>
        </table>
    );
}