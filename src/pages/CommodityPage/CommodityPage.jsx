import './CommodityPage.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from '../../components/Carousel.jsx'
import Plot from '../../components/Plot.jsx'
import Table from '../../components/Table.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'
const varNames = require('../../utilities/scrapedNames') 

export default function CommodityPage() {
    const { params } = useParams();  // Get the commodity code from the URL parameters
    const variable = Object.keys(varNames).find(key => varNames[key] === params)
    const [data, setData] = useState(null);
    const [selectedTimeSeries, setSelectedTimeSeries] = useState('raw');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');

    useEffect(() => {
        const fetchCommodityAnalysis = async () => {
            try {
                const response = await fetch(`/api/commodities/${encodeURIComponent(params)}`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(`An error occurred while fetching the commodity analysis:`, error);
            }
        };

        fetchCommodityAnalysis();
    }, [params]);

    if (data === null) {
        return <div>Loading...</div>;  // Show a loading message while the data is being fetched
    }
    
    return(
        <>
            <HeaderBox text={variable} add={false} fav={false}/>
            <div className="d-flex justify-content-around my-2 gap-2">
                <select className="form-select" value={selectedTimeSeries} onChange={e => setSelectedTimeSeries(e.target.value)}>
                    <option value="raw">raw time series</option>
                    <option value="ma">moving average</option>
                    <option value="acf">acf</option>
                    <option value="pacf">pacf</option>
                </select>
                <select className="form-select" value={selectedTimePeriod} onChange={e => setSelectedTimePeriod(e.target.value)}>
                    <option value="week">past week</option>
                    <option value="month">past month</option>
                    <option value="year">past year</option>
                    <option value="all">all time</option>
                </select>
            </div>
            <Carousel>
                <Plot data={data.raw_time_series} plotId="rawPlot"/>   
                <Plot data={data.acf_plot} plotId="acfPlot"/>   
                <Plot data={data.pacf_plot} plotId="pacfPlot"/>   
                <Plot data={data.ma_smoothed} plotId="maPlot"/>   
            </Carousel>
        </>
    ) 
}