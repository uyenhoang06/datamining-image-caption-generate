import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import UploadImg from './UploadImg.jsx';
import AboutUs from './AboutUs.jsx';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route exact path="/upload" element={<UploadImg/>} />
          <Route exact path="/about" element={<AboutUs/>} />
        </Routes>
  </Router>
 
)
