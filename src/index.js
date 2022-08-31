import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'macro-css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='*' element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
);
