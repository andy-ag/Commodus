import { useEffect, useState, useCallback } from 'react'
import Plotly from 'plotly.js-dist'
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function Plot({data, plotId, timePeriod, frequency, setDownloadData}) {
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
    }, [data, plotId, timePeriod, frequency, setDownloadData, dataForDownload]);

    const handleDownload = useCallback((format) => {
        if (format === 'json') {
            let blob = new Blob([JSON.stringify(dataForDownload)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, `${plotId}_${timePeriod}.json`);
        } else if (format === 'csv') {
            const csv = Papa.unparse(dataForDownload);
            let blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
            saveAs(blob, `${plotId}_${timePeriod}.csv`);
        }
    }, [dataForDownload, plotId, timePeriod]);

    useEffect(() => {
        window.handleDownload = handleDownload;  // Make function global
    }, [handleDownload]);

    useEffect(() => {
        setDownloadData(handleDownload);
    }, [handleDownload, setDownloadData]);

    return <div id={plotId} />;
};
