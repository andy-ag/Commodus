import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'
import dataJSON from './time_series_analysis.json' //! make dynamic

export default function Plot({data}) {
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setPlotData(data);

            const rawTimeSeriesData = [{
                x: dataJSON.raw_time_series.dates,
                y: dataJSON.raw_time_series.values,
                type: 'scatter'
            }];
            Plotly.newPlot('plotDiv', rawTimeSeriesData);
        };

        fetchData();
    }, [data]);

    return <div id="plotDiv" />;
};
