import { useEffect, useState } from 'react'
import Plotly from 'plotly.js-dist'

export default function Plot({data, plotId, timePeriod, frequency, setDownloadData, index, selectedTau}) {
    const [dataForDownload, setDataForDownload] = useState([]);
    
    function getPlotProperties(plotId) {
        if (plotId.includes('delay')) {
            return { type: 'scatter', mode: 'markers' };  // Non-joined scatterplot for delay plot
        } else if (plotId.includes('acf')) {
            return { type: 'bar' };
        } else if (plotId.includes('raw') || plotId.includes('ma')) {
            return { type: 'scatter', mode: 'lines' };
        } else {
            return { type: 'scatter', mode: 'lines' }; 
        }
    }
    
    useEffect(() => {
        async function drawPlot() {    
            if (data) {
                let values, dates;
                
                if (plotId.includes('delay')) {
                    // Access the correct delay plot data based on the selectedTau value
                    const delayData = data[selectedTau];
                    if (delayData) {
                        values = delayData.y;
                        dates = delayData.x;
                    } else {
                        console.error(`Could not find delay plot data for tau = ${selectedTau}`);
                        return;
                    }
                } else {
                    const keys = Object.keys(data);
                    values = data[keys[1]];
                    dates = data[keys[0]];
                }

                let unitsInPeriod;
                if (timePeriod === 'week') {
                    unitsInPeriod = frequency === 'daily' ? 5 : 1;
                } else if (timePeriod === 'month') {
                    unitsInPeriod = frequency === 'daily' ? 21 : 1;
                } else if (timePeriod === 'year') {
                    unitsInPeriod = frequency === 'daily' ? 260 : 12;
                } else {
                    unitsInPeriod = values.length;  // all time
                }

                // Slice data according to selected time period
                values = values.slice(-unitsInPeriod);
                dates = dates.slice(-unitsInPeriod);
                setDataForDownload(dates.map((date, index) => ({ date, value: values[index] })));

                const plotProperties = getPlotProperties(plotId);

                const plotData = [{
                    x: dates,
                    y: values,
                    type: plotProperties.type,
                    mode: plotProperties.mode
                }];

                const plotDiv = document.getElementById(plotId);
                if (plotDiv) {
                    Plotly.newPlot(plotId, plotData);
                }
            }
        }
        drawPlot()
    }, [data, plotId, timePeriod, frequency, setDownloadData, selectedTau]);

    useEffect(() => {
        setDownloadData({ index, dataForDownload, plotId, timePeriod });
    }, [dataForDownload, plotId, timePeriod, setDownloadData, index]);
    
    return <div id={plotId} />;
};
