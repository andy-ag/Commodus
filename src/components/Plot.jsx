import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'

export default function Plot({data, plotId}) {
    useEffect(() => {
        if (data) {
            const keys = Object.keys(data);
            const plotData = [{
                x: data[keys[0]],
                y: data[keys[1]],
                type: 'scatter'
            }];
            Plotly.newPlot(plotId, plotData);
        }
    }, [data, plotId]);

    return <div id={plotId} />;
};
