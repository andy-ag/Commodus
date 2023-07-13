import './CommodityPage.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Plot from '../../components/Plot.jsx'
import Table from '../../components/Table.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'
import Carousel from '../../components/Carousel.jsx'
const varNames = require('../../utilities/scrapedNames') 

export default function CommodityPage({ params: externalParams = null, data: externalData = null, checkFav = true, index, removeFromFavourites }) {
    // If commodity code passed down, use that, else get from query params
    const { params: routeParams } = useParams();
    const params = externalParams || routeParams;

    const variable = Object.keys(varNames).find(key => varNames[key] === params)
    const token = localStorage.getItem('token')
    const [data, setData] = useState(externalData);
    const [isFav, setFav] = useState(false);

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

        const delay = 100*index
        setTimeout(fetchCommodityAnalysis, delay)
    }, [params, index]);

    if (data === null) {
        return <div>Loading...</div>;  // Show a loading message while the data is being fetched
    }
    
    return(
        <>
            <div className="grid-container">
                <div className="header-wrapper">
                    <HeaderBox text={variable} add={true} fav={isFav} apiParams={params} removeFromFavourites={removeFromFavourites}/>
                </div>
                <Carousel params={params}>
                    <Plot data={data.raw_time_series} plotId={`${params}-rawPlot`}/>   
                    <Plot data={data.ma_smoothed} plotId={`${params}-maPlot`}/>   
                    <Plot data={data.acf_plot} plotId={`${params}-acfPlot`}/>   
                    <Plot data={data.pacf_plot} plotId={`${params}-pacfPlot`}/>   
                </Carousel>
            </div>
        </>
    ) 
}