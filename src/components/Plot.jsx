import { useEffect, useState } from 'react'
import Plotly from 'plotly.js-dist'

export default function Plot({data, plotId, timePeriod, frequency, setDownloadData, index}) {
    const [dataForDownload, setDataForDownload] = useState([]);
    
    useEffect(() => {
        async function drawPlot() {    
            if (data) {
                const keys = Object.keys(data);

                let values = data[keys[1]];
                let dates = data[keys[0]];
                
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

                const plotData = [{
                    x: dates,
                    y: values,
                    type: 'scatter'
                }];

                const plotDiv = document.getElementById(plotId);
                if (plotDiv) {
                    Plotly.newPlot(plotId, plotData);
                }
            }
        }
        drawPlot()
        console.log('drawPlot useEffect -> Plot.jsx')
    }, [data, plotId, timePeriod, frequency, setDownloadData]);

    useEffect(() => {
        console.log('setDownloadData useEffect -> Plot.jsx')
        setDownloadData({ index, dataForDownload, plotId, timePeriod });
    }, [dataForDownload, plotId, timePeriod, setDownloadData, index]);
    
    return <div id={plotId} />;
};
