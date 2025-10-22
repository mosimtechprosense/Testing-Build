import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Services from './pages/Services'
import About from './pages/About'
import WhyUs from './pages/WhyUs'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import Home from './pages/Home'
import Footer from './components/Footer'


function App() {
  
  return (
    <>
      <BrowserRouter>
         <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/why-us' element={<WhyUs/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
          </Routes> 
      </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App
