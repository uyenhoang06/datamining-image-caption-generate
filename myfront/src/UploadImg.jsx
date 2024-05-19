import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'
import Upload from './components/Upload.jsx';


function UploadImg() {
  return (
    <div>
      <Navbar/>
      <Home/> 
      <Upload/>
      <Footer/>
    </div>
  )
}

export default UploadImg
