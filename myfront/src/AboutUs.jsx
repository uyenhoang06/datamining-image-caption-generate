import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'
import Home from './components/Home.jsx';
import {useEffect } from "react";


function AboutUs() {

  return (
    <div>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default AboutUs
