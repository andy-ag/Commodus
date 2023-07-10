import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'

export default function Plot({data}) {
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        if (data) {
            setPlotData(data);

            const rawTimeSeriesData = [{
                x: data.raw_time_series.dates,
                y: data.raw_time_series.values,
                type: 'scatter'
            }];
            Plotly.newPlot('plotDiv', rawTimeSeriesData);
        }
    }, [data]);

    return <div id="plotDiv" />;
};
