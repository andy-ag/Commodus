import './CommodityPage.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from '../../components/Carousel.jsx'
import Plot from '../../components/Plot.jsx'
import Table from '../../components/Table.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'
const varNames = require('../../utilities/scrapedNames') 

export default function CommodityPage({ params: externalParams = null, checkFav = true }) {
    // If commodity code passed down, use that, else get from query params
    const { params: routeParams } = useParams();
    const params = externalParams || routeParams;

    const variable = Object.keys(varNames).find(key => varNames[key] === params)
    const token = localStorage.getItem('token')
    const PLOT_ORDER = ["raw", "ma", "acf", "pacf"]
    const [data, setData] = useState(null);
    const [isFav, setFav] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTimeSeries, setSelectedTimeSeries] = useState('raw');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');

    function handleIndexChange(newIndex) {
        setSelectedTimeSeries(PLOT_ORDER[newIndex])
    }

    useEffect(() => {
        if (checkFav) {
        const checkFav = async () => {
            try {
                const response = await fetch(`/api/commodities/${encodeURIComponent(params)}/isfavourite`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const favStatus = await response.json();
                setFav(favStatus === 'true');
            } catch (error) {
                console.error(`Error checking favourite status: ${error.message}`);
            }
        };
        checkFav();
    }}, [params, token, checkFav]);

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
            <HeaderBox text={variable} add={true} fav={isFav} apiParams={params}/>
            <div className="d-flex justify-content-around mt-4 mb-2 gap-2">
                <select className="form-select" value={selectedTimeSeries} onChange={e => {
                    setSelectedTimeSeries(e.target.value)
                    setCurrentIndex(PLOT_ORDER.indexOf(e.target.value))
                }}>
                    <option value="raw">raw time series</option>
                    <option value="ma">moving average</option>
                    <option value="acf">acf</option>
                    <option value="pacf">pacf</option>
                </select>
                <select className="form-select" value={selectedTimePeriod} onChange={e => {
                    setSelectedTimePeriod(e.target.value)
                }}>
                    <option value="week">past week</option>
                    <option value="month">past month</option>
                    <option value="year">past year</option>
                    <option value="all">all time</option>
                </select>
            </div>
            <Carousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} handleIndexChange={handleIndexChange}>
                <Plot data={data.raw_time_series} plotId="rawPlot"/>   
                <Plot data={data.ma_smoothed} plotId="maPlot"/>   
                <Plot data={data.acf_plot} plotId="acfPlot"/>   
                <Plot data={data.pacf_plot} plotId="pacfPlot"/>   
            </Carousel>
        </>
    ) 
}