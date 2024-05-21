import './App.css'
import './index.css'

import React from 'react'

import HomePage from './HomePage.jsx'
import UploadImg from './UploadImg.jsx';
import AboutUs from './AboutUs.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/upload" element={<UploadImg/>} />
          <Route exact path="/about" element={<AboutUs/>} />
        </Routes>
    </Router>
  )
}

export default App;
