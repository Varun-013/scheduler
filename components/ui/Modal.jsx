// components/ui/modal.jsx
"use client";
import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;