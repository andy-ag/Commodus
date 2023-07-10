import './CommodityPage.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Plot from '../../components/Plot.jsx'
import Table from '../../components/Table.jsx'

export default function CommodityPage() {
    const { params } = useParams();  // Get the commodity code from the URL parameters
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCommodityAnalysis = async () => {
            try {
                const response = await fetch(`/api/commodities/analyse/${encodeURIComponent(params)}`);
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
            <Plot data={data}/>
            <Table data={data}/>    
        </>
    ) 
}