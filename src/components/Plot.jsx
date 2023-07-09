import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'
import dataJSON from './time_series_analysis.json'

export default function Plot() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setData(dataJSON);

            const rawTimeSeriesData = [{
                x: dataJSON.raw_time_series.dates,
                y: dataJSON.raw_time_series.values,
                type: 'scatter'
            }];
            Plotly.newPlot('plotDiv', rawTimeSeriesData);
        };

        fetchData();
    }, []);

    return <div id="plotDiv" />;
};
