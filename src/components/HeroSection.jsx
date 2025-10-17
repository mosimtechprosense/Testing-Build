import { useState } from "react";
import bookmybanquetsLogo from "../assets/bookmybanquet.png";
import { IoMdArrowDropdown } from "react-icons/io";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Outer wrapper: clicking anywhere closes menu
    <div
      className="relative w-full bg-[#dc2626] py-2 px-4 md:px-22 flex items-center justify-between"
      onClick={() => setMenuOpen(false)}
    >
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <img
          src={bookmybanquetsLogo}
          alt="bookmybanquetsLogo"
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-white text-3xl cursor-pointer select-none z-50"
        onClick={(e) => {
          e.stopPropagation(); // prevent closing when clicking button
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Navigation */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white absolute md:static top-16 left-0 w-full md:w-auto bg-[#dc2626] md:bg-transparent px-6 md:px-4 py-4 md:py-0 z-40 shadow-md md:shadow-none transition-all duration-200`}
        onClick={(e) => e.stopPropagation()} // prevents parent onClick from closing it
      >
        <h3 className="font-medium hover:text-black transition duration-200 cursor-pointer">
          Home
        </h3>

        <div className="flex items-center gap-1 font-medium hover:text-black transition duration-200 cursor-pointer">
          <h2>Venues</h2>
          <IoMdArrowDropdown />
        </div>

        <h3 className="font-medium hover:text-black transition duration-200 cursor-pointer">
          Services
        </h3>
        <h3 className="font-medium hover:text-black transition duration-200 cursor-pointer">
          About
        </h3>
        <h3 className="font-medium whitespace-nowrap hover:text-black transition duration-200 cursor-pointer">
          Why Us?
        </h3>
        <h3 className="font-medium hover:text-black transition duration-200 cursor-pointer">
          Blog
        </h3>
        <h3 className="font-medium whitespace-nowrap hover:text-black transition duration-200 cursor-pointer">
          Contact Us
        </h3>
      </div>

      {/* Overlay (optional for UX) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 md:hidden z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default HeroSection;
