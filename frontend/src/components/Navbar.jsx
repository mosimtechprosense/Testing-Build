import { IoLogoFacebook, IoCall } from "react-icons/io5";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import HeroSection from "./HeroSection";
import { useContext } from "react";
import { UIContext } from "../store/UIContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const { setPopupOpen } = useContext(UIContext);
      const navigate = useNavigate();

    const quoteHandler = () => {
       setPopupOpen(true)
    }


  return (
    <div>
      <div className="flex flex-col gap-0 md:flex-row items-center justify-between py-2 px-6 md:px-20 bg-white border-b border-gray-200 select-none">
        {/* Left Section: Social Icons & Phone */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/bookmybanquets06/" aria-label="Facebook">
              <IoLogoFacebook className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/bookmy-banquet-210784336/" aria-label="LinkedIn">
              <FaLinkedin className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.instagram.com/book_my_banquets/" aria-label="Instagram">
              <RiInstagramLine className="text-[#dc2626] text-xl hover:text-black transition duration-200" />
            </a>
            <a href="https://www.youtube.com/@Bookmybanquets" aria-label="YouTube">
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


          {/* city filter */}
<select
  className="px-5 py-2.5 rounded border text-[#212121] text-[0.8rem] font-medium cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
  defaultValue="Select"
  onChange={(e) => {
    const city = e.target.value;
    if (!city) return;

    const citySlug = city.toLowerCase() === "gurgaon" ? "gurgaon" : city.toLowerCase();

    // Update filters in ListingsPage via navigate + state
    navigate(`/listings/${citySlug}`, {
      state: { resetFilters: true } // optional flag
    });
  }}
>
  <option disabled value="Select">Select City</option>
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