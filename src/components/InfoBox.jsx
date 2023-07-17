import { useState } from 'react';
import './InfoBox.css';
const infoMap = require('../utilities/techniques');

export default function InfoBox({ selectedAnalysis }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-link info-box" onClick={handleShow}>
        <i className="fas fa-info-circle"></i>
      </button>

      <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{display: show ? 'block' : 'none'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-info">
            <div className="modal-header border-0 justify-content-center">
              <h5 className="modal-title">{selectedAnalysis}</h5>
              <button type="button" className="btn-close position-absolute close-modal-btn" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p>{infoMap[selectedAnalysis].description}</p>
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button type="button" className="btn btn-secondary close-modal" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
