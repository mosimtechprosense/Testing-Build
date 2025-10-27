import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import homeWalpaper from "../assets/homeWalpaper.avif";
import CustomerReview from "../components/CustomerReview";
import HowItWorks from "../components/HowItWorks";
import Categories from "../components/Categories";
import WhyUsSection from "../components/WhyUsSection";

const Home = () => {
  const services = [
    { name: "Banquet Halls" },
    { name: "Marriage Gardens" },
    { name: "Wedding Farmhouse" },
    { name: "Party Halls" },
    { name: "5 Star Wedding Hotels" },
    { name: "Destination Weddings" },
    { name: "Photographers / Videography" },
    { name: "Makeup Artists" },
    { name: "Mehandi Artists" },
    { name: "Decorators" },
    { name: "Invitation Cards" },
    { name: "Choreographers / Dancers" },
    { name: "Wedding Bands" },
    { name: "Wedding Transportation / Vintage cars" },
    { name: "Bridal Wear" },
    { name: "Groom Wear" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = services.filter((service) =>
      service.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleSelectService = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      {/*  Hero Section */}
      <div
        className="h-[70vh] sm:h-[80vh] lg:h-[90vh] bg-cover bg-center flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${homeWalpaper})` }}
      >
        {/*  Hero Text */}
        <div className="text-center px-4 sm:px-6 mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-snug"
            style={{
              textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            Your Dream Wedding Starts Here — Explore Venues, Decor & More!
          </h1>
        </div>

        {/*  Search Bar */}
        <div className="flex items-center justify-center w-full px-6">
          <div className="flex flex-col sm:flex-row  bg-white border border-[#b4b4be] rounded-md shadow-md w-[98%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] max-w-[1100px]">
            {/*  Venues & Services Input */}
            <div className="relative flex items-center gap-2 w-full sm:w-[60%] py-4 px-5 text-[15px] border-b sm:border-b-0 sm:border-r border-gray-300">
              <IoIosSearch className="text-gray-700 text-xl" />
              <input
                type="text"
                placeholder="Search for venues, decor, services..."
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onClick={(e) => e.stopPropagation()}
              />

              {showSuggestions && (
                <div
                  className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-[255px] sm:max-h-[155px] overflow-y-auto z-50 shadow-md rounded scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectService(item.name)}
                        className="flex items-center px-3 py-2.5 text-gray-700 text-sm border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="mr-3 p-2 rounded-full bg-gray-100">
                          <IoIosSearch className="text-gray-500" />
                        </div>
                        <span className="text-[#414146]">{item.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-400 text-sm">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/*  Location Input */}
            <div className="flex items-center gap-2 w-full sm:w-[40%] py-4 px-5 text-[15px] border-b sm:border-b-0 sm:border-r border-gray-300">
              <CiLocationOn className="text-gray-700 text-xl" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer"
              />
            </div>

            {/*  Search Button */}
            <button className="bg-[#dc2626] text-white px-7 py-4 flex items-center justify-center cursor-pointer hover:bg-[#b91c1c] transition-all w-full sm:w-auto text-base font-semibold">
              {/* Show icon on larger screens, text on small screens */}
              <span className="block sm:hidden">Search</span>
              <FaSearch className="hidden sm:block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/*  Why Us Section */}
      <WhyUsSection />

      {/*  Category section */}
      <Categories />

      {/* Customer Review Section */}
      <CustomerReview />

      {/*How It Works Section*/}
      <HowItWorks />
    </div>
  );
};

export default Home;
