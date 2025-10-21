import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import homeWalpaper from "../assets/homeWalpaper.jpg";
import CustomerReview from "../components/CustomerReview";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  const whyUsContent = [
    { title: "Events Organized", count: "1000+" },
    { title: "Present in Cities", count: "50+" },
    { title: "Wedding Venues", count: "500+" },
    { title: "Wedding Locations", count: "50+" },
  ];

  return (
    <div className="w-full">
      {/* 🏠 Hero Section */}
      <div
        className="h-[70vh] sm:h-[80vh] lg:h-[90vh] bg-cover bg-center flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${homeWalpaper})` }}
      >
        {/* 🌟 Hero Text */}
        <div className="text-center px-4 sm:px-6 mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-snug"
            style={{
              textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Your Dream Wedding Starts Here — Explore Venues, Decor & More!
          </h1>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex items-center justify-center w-full px-10">
          <div className="flex flex-col sm:flex-row  bg-white border border-[#b4b4be] rounded-md shadow-md overflow-hidden w-[98%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] max-w-[1100px]">
            
            {/* 🏛 Venues & Services Input */}
            <div className="flex items-center gap-2 w-full sm:w-[60%] py-4 px-5 text-[15px] border-b sm:border-b-0 sm:border-r border-gray-300">
              <IoIosSearch className="text-gray-700 text-xl" />
              <input
                type="text"
                placeholder="Search for venues, Decor, services..."
                className="w-full text-gray-700 placeholder-gray-500 outline-none"
              />
            </div>

            {/* 📍 Location Input */}
            <div className="flex items-center gap-2 w-full sm:w-[40%] py-4 px-5 text-[15px] border-b sm:border-b-0 sm:border-r border-gray-300">
              <CiLocationOn className="text-gray-700 text-xl" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full text-gray-700 placeholder-gray-500 outline-none"
              />
            </div>

            {/* 🔘 Search Button */}
            <button className="bg-[#dc2626] text-white px-7 py-4 flex items-center justify-center hover:bg-[#b91c1c] transition-all w-full sm:w-auto text-base font-semibold">
              {/* Show icon on larger screens, text on small screens */}
              <span className="block sm:hidden">Search</span>
              <FaSearch className="hidden sm:block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 Why Us Section */}
      <section className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 px-4 sm:px-8 md:px-16 lg:px-24 py-12 text-center">
        {whyUsContent.map((whyus) => (
          <div
            key={whyus.title}
            className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[220px]"
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#dc2626]">
              {whyus.title}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#06002e] mt-2">
              {whyus.count}
            </h2>
          </div>
        ))}
      </section>

      {/* 💬 Customer Review Section */}
      <CustomerReview />

      {/*How It Works Section*/}
      <HowItWorks/>
    </div>
  );
};

export default Home;
