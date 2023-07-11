import { useState } from 'react';
import './Carousel.css'

export default function Carousel({children, currentIndex, setCurrentIndex, handleIndexChange }) {

  function goToPrevPlot() {
    setCurrentIndex(oldIndex => {
        let newIndex = oldIndex === 0 ? children.length - 1 : oldIndex - 1;
        handleIndexChange(newIndex)
        return newIndex;
    });
  }

  function goToNextPlot() {
    setCurrentIndex(oldIndex => {
        let newIndex = (oldIndex + 1) % children.length;
        handleIndexChange(newIndex)
        return newIndex;
    })
  }

  return (
    <div className="carousel-container">
      <button className="triangle triangle-left" onClick={goToPrevPlot}></button>
      <div className="carousel-plot">{children[currentIndex]}</div>
      <button className="triangle triangle-right" onClick={goToNextPlot}></button>
    </div>
  );
}
