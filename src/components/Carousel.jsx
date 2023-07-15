import { useState, cloneElement, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './Carousel.css'
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function Carousel({children, params}) {
  const PLOT_ORDER = ["raw", "ma", "acf", "pacf"]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTimeSeries, setSelectedTimeSeries] = useState(`${params}-raw`);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');
  const [downloadData, setDownloadData] = useState([]);

  const handleSetDownloadData = useCallback(({ index, dataForDownload, plotId, timePeriod }) => {
    console.log('handleSetDownloadData -> Carousel.jsx')
    setDownloadData(prev => {
      const newData = [...prev];
      newData[index] = { dataForDownload, plotId, timePeriod };
      return newData;
    });
}, []);


  function handleDownload(format) {
    const { dataForDownload, plotId, timePeriod } = downloadData[currentIndex];
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(dataForDownload)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `${plotId}_${timePeriod}.json`);
    } else if (format === 'csv') {
        const csv = Papa.unparse(dataForDownload);
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        saveAs(blob, `${plotId}_${timePeriod}.csv`);
    }
  }


  function goToPrevPlot() {
    setCurrentIndex(oldIndex => {
        let newIndex = oldIndex === 0 ? children.length - 1 : oldIndex - 1;
        setSelectedTimeSeries(`${params}-${PLOT_ORDER[newIndex]}`);
        return newIndex;
    });
  }

  function goToNextPlot() {
    setCurrentIndex(oldIndex => {
        let newIndex = (oldIndex + 1) % children.length;
        setSelectedTimeSeries(`${params}-${PLOT_ORDER[newIndex]}`);
        return newIndex;
    })
  }

  return (
      <>
        <div className="d-flex justify-content-center mt-4 gap-2">
          <select className="form-select" value={selectedTimeSeries} onChange={e => {
              const newTimeSeries = e.target.value;
              setSelectedTimeSeries(newTimeSeries);
              setCurrentIndex(PLOT_ORDER.indexOf(newTimeSeries.split('-')[1]));
          }}>
              <option value={`${params}-raw`}>raw time series</option>
              <option value={`${params}-ma`}>moving average</option>
              <option value={`${params}-acf`}>acf</option>
              <option value={`${params}-pacf`}>pacf</option>
          </select>
          <select className="form-select" value={selectedTimePeriod} onChange={e => {
              setSelectedTimePeriod(e.target.value)
          }}>
              <option value="week">past week</option>
              <option value="month">past month</option>
              <option value="year">past year</option>
              <option value="all">all time</option>
          </select>
          <div className="dropdown">
            <button className="btn btn-icon" title="Download raw data" type="button" id="downloadMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faDownload} style={{color: 'var(--accent)'}} title="Download raw data" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="downloadMenuButton">
              <li><button className="dropdown-item" onClick={() => handleDownload('json')}>JSON</button></li>
              <li><button className="dropdown-item" onClick={() => handleDownload('csv')}>CSV</button></li>
            </ul>
          </div>
      </div>
      
      
      <div className="carousel-container">
        <button className="triangle triangle-left" onClick={goToPrevPlot}></button>
        <div className="carousel-plot">{cloneElement(children[currentIndex], { 
          timePeriod: selectedTimePeriod,
          setDownloadData: handleSetDownloadData,
          index: currentIndex
      })}</div> 
        <button className="triangle triangle-right" onClick={goToNextPlot}></button>
      </div>
    </>
  );
}
