import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, handleConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this note?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleClose}>No</button>
      </div>
    </div>
  );
};

export default Modal;
