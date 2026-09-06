import React from 'react';
import "../styles/SharedComponents.css";

export default function LoadingScreen({process}) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading {process}.</p>
    </div>
  );
}