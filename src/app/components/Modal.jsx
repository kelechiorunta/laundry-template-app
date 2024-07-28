// components/Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <FaTimes className="text-gray-600 hover:text-gray-800" size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Confirm Navigation</h2>
        <p className="mb-6">Are you sure you want to leave this page?</p>
        <div className="flex justify-end space-x-4">
            {children}
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
