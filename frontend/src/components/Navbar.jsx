import { IoLogoFacebook, IoCall } from "react-icons/io5";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import HeroSection from "./HeroSection";
import { useContext } from "react";
import { UIContext } from "../store/UIContext";


const Navbar = () => {

    const { setPopupOpen } = useContext(UIContext);

    const quoteHandler = () => {
       setPopupOpen(true)
    }


  return (
    <div>
      <div className="flex flex-col gap-0 md:flex-row items-center justify-between py-2 px-6 md:px-20 bg-white border-b border-gray-200">
        {/* Left Section: Social Icons & Phone */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook">
              <IoLogoFacebook className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="#" aria-label="Instagram">
              <RiInstagramLine className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 ">
            <IoCall className="text-lg text-[#dc2626]" />
            <a href="#" aria-label="Call">
              <span className="font-medium hover:text-[#dc2626] transition duration-200">
                +91 8920597474
              </span>
            </a>
          </div>
        </div>

        {/* Right Section: CTA + City Selector */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button onClick={quoteHandler} className="bg-[#dc2626] text-white text-[0.8rem] font-medium px-5 py-2.5 rounded hover:bg-red-700 cursor-pointer transition duration-200 whitespace-nowrap">
            Get a Quote
          </button>
          <select
            className="px-5 py-2.5 rounded border text-[#212121] text-[0.8rem] font-medium cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
            defaultValue="Select"
          >
            <option disabled value="Select">
              Select City
            </option>
            <option>Delhi</option>
            <option>Gurgaon</option>
          </select>
        </div>
      </div>
      <HeroSection/>
      

    </div>
  );
};

export default Navbar;
