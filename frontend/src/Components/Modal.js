import React from "react";
import reactDom from "react-dom";

function Modal({ open, children, onClose }) {
  if (!open) return null;
  return reactDom.createPortal(
      <>
    <div>
      {children}
      <button onClick={onClose}>close</button>
    </div>
    </>
  );
}

export default Modal;
