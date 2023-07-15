import { useState, cloneElement } from 'react';
import './Carousel.css'

export default function Carousel({children, params}) {
  const PLOT_ORDER = ["raw", "ma", "acf", "pacf"]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTimeSeries, setSelectedTimeSeries] = useState(`${params}-raw`);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');

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
      </div>
      
      
      <div className="carousel-container">
        <button className="triangle triangle-left" onClick={goToPrevPlot}></button>
        <div className="carousel-plot">{cloneElement(children[currentIndex], { timePeriod: selectedTimePeriod })}</div>
        <button className="triangle triangle-right" onClick={goToNextPlot}></button>
      </div>
    </>
  );
}
