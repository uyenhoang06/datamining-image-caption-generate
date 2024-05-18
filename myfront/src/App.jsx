import './App.css'
import Topic from './components/Topic.jsx'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'
import About  from './components/About.jsx'
import Pricing  from './components/Pricing.jsx'

import {useEffect } from "react";


function App() {

  useEffect(
    ()=>{
        fetch("http://127.0.0.1:5000/")
        .then(response=> response.json())
        .then(data=> {
          console.log(data)
        })

    },[]

  )
  return (
    <div>
      <Navbar/>
      <Home/> 
      <Topic/>
      <About/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default App
