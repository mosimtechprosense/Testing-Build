import footer_logo from '../assets/footer_logo.png'
import { IoLogoFacebook } from "react-icons/io5";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] pt-12 pb-5 px-8 text-black font-medium">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 1️⃣ Logo + Description */}
       <div className="flex flex-col items-center md:items-start text-center md:text-left">
         <img src={footer_logo} alt="bookMyBanquetsLogo" className="w-40 h-auto mb-5"/>
           <p className="text-base leading-relaxed max-w-sm">
            Discover the most high rated wedding vendors and plan your wedding more better, forever.
        </p>
       </div>
        {/* 2️⃣ Company */}
        <div>
          <h2 className="text-red-600 mb-3 text-lg">Company</h2>
          <ul className="space-y-2 text-base">
            <li><a href="#" className="hover:text-red-600">About us</a></li>
            <li><a href="#" className="hover:text-red-600">Venues</a></li>
            <li><a href="#" className="hover:text-red-600">Blog</a></li>
            <li><a href="#" className="hover:text-red-600">Why?</a></li>
          </ul>
        </div>

        {/* 3️⃣ Support */}
        <div>
          <h2 className="text-red-600 mb-3 text-lg">Support</h2>
          <ul className="space-y-2 text-base">
            <li><a href="#" className="hover:text-red-600">Get in Touch</a></li>
            <li><a href="#" className="hover:text-red-600">Terms</a></li>
            <li><a href="#" className="hover:text-red-600">Privacy</a></li>
            <li><a href="#" className="hover:text-red-600">Sitemap</a></li>
          </ul>
        </div>

        {/* 4️⃣ Contact */}
        <div>
          <h2 className="text-red-600 mb-3 text-lg">Contact us</h2>
          <ul className="space-y-2 text-base">
            <li>📧 info@bookmybanquets.in</li>
            <li>📞 +91 8920597474</li>
            <li>📍 Unit No. 1369, Second floor,<br />
                ILD Trade Centre, Sector 47,<br />
                Sohna Road, Gurgaon Haryana</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className=" bg-border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-base">
        <h1>© 2025 Book My Banquets</h1>
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <a href="#" aria-label="Facebook"><IoLogoFacebook className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="#" aria-label="Instagram"><RiInstagramLine className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
          <a href="#" aria-label="YouTube"><FaYoutube className="text-red-600 text-2xl hover:text-black transition duration-200" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
