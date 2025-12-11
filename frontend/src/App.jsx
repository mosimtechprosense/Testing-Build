import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import Navbar from "./components/Navbar"
import Services from "./pages/Services"
import About from "./pages/About"
import WhyUs from "./pages/WhyUs"
import Blog from "./pages/Blog"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import DiscountPopup from "./components/DiscountPopup"
import RecentSearches from "./components/RecentSearches"
import UIProvider from "./store/UIContext"
import ListingsPage from "./pages/ListingsPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <UIProvider>
          <ScrollToTop />
          <Navbar />
          <DiscountPopup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/venues" element={<ListingsPage />} />
            <Route path="/banquet-hall-in/:citySlug" element={<ListingsPage />} />
          </Routes>
          <RecentSearches />
          <Footer />
        </UIProvider>
      </BrowserRouter>
    </>
  )
}

export default App