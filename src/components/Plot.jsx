import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'

export default function Plot({data, plotId}) {
    useEffect(() => {
        async function drawPlot() {    
            if (data) {
                const keys = Object.keys(data);
                const plotData = [{
                    x: data[keys[0]],
                    y: data[keys[1]],
                    type: 'scatter'
                }];
                const plotDiv = document.getElementById(plotId);
                if (plotDiv) {
                    Plotly.newPlot(plotId, plotData);
                }
            }
        }
        drawPlot()
    }, [data, plotId]);

    return <div id={plotId} />;
};
