import { useState, cloneElement, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './Carousel.css'
import InfoBox from './InfoBox';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function Carousel({children, params, frequency}) {
  const PLOT_ORDER = ["raw", "ma", "acf", "pacf", "delay"]
  const INFO_KEYS = ["Time series", "Moving average", "Autocorrelation function", "Partial autocorrelation function", "Delay plot"]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTimeSeries, setSelectedTimeSeries] = useState(`${params}-raw`);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');
  const [downloadData, setDownloadData] = useState([]);
  const [selectedTau, setSelectedTau] = useState('1');
  const selectedAnalysis = INFO_KEYS[currentIndex];

  function isTimePeriodDisabled(selectedTimeSeries) {
    return selectedTimeSeries.includes('acf') || selectedTimeSeries.includes('pacf');
  }
  
  const handleSetDownloadData = useCallback(({ index, dataForDownload, plotId, timePeriod }) => {
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
          <select className="form-select tau" value={selectedTau} onChange={e => setSelectedTau(e.target.value)} style={{display: selectedTimeSeries === `${params}-delay` ? 'block' : 'none'}}>
              {Array.from({length: 12}, (_, i) => i + 1).map(tau =>
                  <option value={tau} key={tau}>t = {tau}</option>
              )}
          </select>
          <InfoBox selectedAnalysis={selectedAnalysis} />
          <select className="form-select" value={selectedTimeSeries} onChange={e => {
              const newTimeSeries = e.target.value;
              setSelectedTimeSeries(newTimeSeries);
              setCurrentIndex(PLOT_ORDER.indexOf(newTimeSeries.split('-')[1]))
              if (isTimePeriodDisabled(newTimeSeries)) {
                setSelectedTimePeriod('all');
              };
          }}>
              <option value={`${params}-raw`}>raw time series</option>
              <option value={`${params}-ma`}>moving average</option>
              <option value={`${params}-acf`}>acf</option>
              <option value={`${params}-pacf`}>pacf</option>
              <option value={`${params}-delay`}>delay plot</option>
          </select>
          <select className="form-select" value={selectedTimePeriod} disabled={isTimePeriodDisabled(selectedTimeSeries)} onChange={e => {
              setSelectedTimePeriod(e.target.value)
          }}>
              {frequency === 'daily' &&<option value="week">past week</option>}
              {frequency === 'daily' &&<option value="month">past month</option>}
              <option value="year">past year</option>
              <option value="all">all time</option>
          </select>
          <div className="dropdown">
            <button className="btn btn-icon" title="Download raw data" type="button" id="downloadMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faDownload} style={{color: 'var(--accent)'}} title="Download data" />
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
          index: currentIndex,
          frequency: frequency,
          selectedTau: selectedTau
      })}</div> 
        <button className="triangle triangle-right" onClick={goToNextPlot}></button>
      </div>
    </>
  );
}
