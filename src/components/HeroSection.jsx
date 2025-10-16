import bookmybanquetsLogo from "../assets/bookmybanquet.png"
import { IoHomeSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import Services from "../pages/Services";


const HeroSection = () => {
  return (
    <div className='w-full bg-[#dc2626] py-2 flex items-center'>
      {/* Left Section: bookmybanquetsLogo */}
        <div className="ml-20 pl-10">
          <img src={bookmybanquetsLogo} alt="bookmybanquetsLogo" />
        </div>
      {/* Right Section: venues & pages */}
        <div className="flex items-center px-10 text-white">
          <IoHomeSharp />
      {/* Venues Section */}
          <div className="flex items-center gap-10 text-white font-medium">
            <h2>Venues</h2>
             <IoMdArrowDropdown /> 
          </div>
      {/* pages */}
         <div className="flex items-center justify-between text-white  font-medium">
            <h3>Services</h3>
            <h3>About</h3>
            <h3>Why Us?</h3>
            <h3>Blog</h3>
            <h3>Contact Us</h3>
          </div>
        </div>
    </div>
  )
}

export default HeroSection