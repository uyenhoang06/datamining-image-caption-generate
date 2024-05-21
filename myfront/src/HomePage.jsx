import './App.css'
import Topic from './components/Topic.jsx'
import Navbar from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'
import About  from './components/About.jsx'
import Pricing  from './components/Pricing.jsx'
import SlideImage from './components/SlideImage.jsx';


const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <SlideImage/>
      <Topic/>
      <About/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default HomePage;
