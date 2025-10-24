import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from "./ScrollToTop";
import Navbar from './components/Navbar'
import Services from './pages/Services'
import About from './pages/About'
import WhyUs from './pages/WhyUs'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import Home from './pages/Home'
import Footer from './components/Footer'
import Terms from './pages/terms'
import Privacy from './pages/Privacy'


function App() {
  
  return (
    <>
      <BrowserRouter>
         <ScrollToTop /> 
         <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/why-us' element={<WhyUs/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/terms' element={<Terms/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
          </Routes>
          <Footer/> 
      </BrowserRouter>  
    </>
  )
}

export default App
