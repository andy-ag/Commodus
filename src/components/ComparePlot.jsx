import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';
import { toast } from 'react-hot-toast';

export default function ComparePlot({data1, data2, plotId, timePeriod, frequency1, frequency2, name1, name2}) {
    
    useEffect(() => {
        async function drawPlot() {    
            if (data1 && data2) {
                const { dates: dates1, values: values1 } = data1;
                const { dates: dates2, values: values2 } = data2;

                let unitsInPeriod1;
                if (timePeriod === 'week') {
                    unitsInPeriod1 = frequency1 === 'daily' ? 5 : 1;
                } else if (timePeriod === 'month') {
                    unitsInPeriod1 = frequency1 === 'daily' ? 21 : 1;
                } else if (timePeriod === 'year') {
                    unitsInPeriod1 = frequency1 === 'daily' ? 260 : 12;
                } else {
                    unitsInPeriod1 = values1.length;
                }

                let unitsInPeriod2;
                if (timePeriod === 'week') {
                    unitsInPeriod2 = frequency2 === 'daily' ? 5 : 1;
                } else if (timePeriod === 'month') {
                    unitsInPeriod2 = frequency2 === 'daily' ? 21 : 1;
                } else if (timePeriod === 'year') {
                    unitsInPeriod2 = frequency2 === 'daily' ? 260 : 12;
                } else {
                    unitsInPeriod2 = values2.length;
                }
                
                const sliceValues1 = values1.slice(-unitsInPeriod1);
                const sliceDates1 = dates1.slice(-unitsInPeriod1);
                const sliceValues2 = values2.slice(-unitsInPeriod2);
                const sliceDates2 = dates2.slice(-unitsInPeriod2);

                const plotData = [
                    {
                        x: sliceDates1,
                        y: sliceValues1,
                        type: 'scatter',
                        mode: 'lines',
                        name: name1,
                        yaxis: 'y'
                    },
                    {
                        x: sliceDates2,
                        y: sliceValues2,
                        type: 'scatter',
                        mode: 'lines',
                        name: name2,
                        yaxis: 'y2'
                    }
                ];

                const layout = {
                    autosize: true,
                    legend: {
                        x: 0.5,
                        y: -0.1,
                        xanchor: 'center',
                        orientation: 'h'
                    },
                    yaxis: { title: '', side: 'left', tickfont: {color: '#1f77b4'} },
                    yaxis2: { title: '', side: 'right', overlaying: 'y', showgrid: false, tickfont: {color: '#ff7f0e'} },
                    margin: {
                        l: 50,
                        r: 50,
                        b: 100,
                        t: 100,
                        pad: 4
                    },
                    width: window.innerWidth * 0.5
                };

                const plotDiv = document.getElementById(plotId);
                if (plotDiv) {
                    Plotly.newPlot(plotId, plotData, layout);
                }
            }
        }
        drawPlot();
    }, [data1, data2, plotId, timePeriod, frequency1, frequency2, name1, name2]);

    return <div id={plotId} />;
};
