// src/components/Success.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './success.css';

const Success = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return <div>No form data available.</div>;
  }

  return (
    <div className="success-container">
      <h2 className="success-header">Form Submitted Successfully!</h2>
      <ul className="success-list">
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Success;
