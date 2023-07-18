import './CommodityPage.css';
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Plot from '../../components/Plot.jsx'
import HeaderBox from '../../components/HeaderBox.jsx'
import Carousel from '../../components/Carousel.jsx'
import CommodityTable from '../../components/CommodityTable.jsx';
import { toast } from 'react-hot-toast';
const varNames = require('../../utilities/scrapedNames') 


export default function CommodityPage({ params: externalParams = null, data: externalData = null, checkFav = true, index, removeFromFavourites, loading=false, onCommodityLoaded, isStandalone=true }) {
    // If commodity code passed down, use that, else get from query params
    const { params: routeParams } = useParams();
    const params = externalParams || routeParams;

    const variable = Object.keys(varNames).find(key => varNames[key] === params)
    const token = localStorage.getItem('token')
    const [data, setData] = useState(externalData);
    const [isFav, setFav] = useState(false);
    const toastIdRef = useRef(null);

    useEffect(() => {
        if (data !== null && loading) {
            onCommodityLoaded();
        }
    }, [data, loading, onCommodityLoaded]);

    useEffect(() => {
        if (isStandalone) {
            toastIdRef.current = toast.loading('Crunching the numbers', {
                iconTheme: {
                  primary: 'var(--accent)',
                  secondary: 'white',
                },
            });
        }
    }, [isStandalone]);

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
                if (isStandalone) {
                    toast.dismiss(toastIdRef.current);
                }
            } catch (error) {
                console.error(`An error occurred while fetching the commodity analysis:`, error);
            }
        };

        const delay = 100*index
        setTimeout(fetchCommodityAnalysis, delay)
    }, [params, index, isStandalone]);

    if (data === null) {
        return null;
    }
    
    return(
        <>
            <div className="grid-container">
                <div className="header-wrapper">
                    <HeaderBox text={variable} add={true} fav={isFav} apiParams={params} removeFromFavourites={removeFromFavourites}/>
                </div>
                <p className="frequency">({data.frequency} data)</p>
                <Carousel params={params} frequency={data.frequency}>
                    <Plot data={data.raw_time_series} plotId={`${params}-rawPlot`} frequency={data.frequency}/>   
                    <Plot data={data.ma_smoothed} plotId={`${params}-maPlot`} frequency={data.frequency}/>   
                    <Plot data={data.acf_plot} plotId={`${params}-acfPlot`} frequency={data.frequency}/>   
                    <Plot data={data.pacf_plot} plotId={`${params}-pacfPlot`} frequency={data.frequency}/>   
                    <Plot data={data.delay_plots} plotId={`${params}-delayPlot`} frequency={data.frequency}/>   
                </Carousel>
                <CommodityTable statistics={data.statistics} rawTimeSeries={data.raw_time_series}/>
            </div>
        </>
    ) 
}