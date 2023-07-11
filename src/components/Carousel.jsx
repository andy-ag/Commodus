import { useState } from 'react';
import './Carousel.css'

export default function Carousel({children}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToPrevPlot() {
    setCurrentIndex(oldIndex => {
      if (oldIndex === 0) return children.length - 1;
      return oldIndex - 1;
    });
  }

  function goToNextPlot() {
    setCurrentIndex(oldIndex => (oldIndex + 1) % children.length);
  }

  return (
    <div className="carousel-container">
      <button className="triangle triangle-left" onClick={goToPrevPlot}></button>
      <div className="carousel-plot">{children[currentIndex]}</div>
      <button className="triangle triangle-right" onClick={goToNextPlot}></button>
    </div>
  );
}
