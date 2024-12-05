// src/frontend/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // No change needed here since App.js is in the same directory
// import reportWebVitals from './reportWebVitals'; // If using Create React App

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If using Create React App and want to measure performance
// reportWebVitals();
