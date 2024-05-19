import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'
import Team from './components/Team.jsx';

import {useEffect } from "react";


function AboutUs() {

  return (
    <div>
      <Navbar/>
      <Team/>
      <Footer/>
    </div>
  )
}

export default AboutUs
