import React from "react";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const navigate = useNavigate();

  const locations = [
    { location: "Moti Nagar", city: "Delhi" },
    { location: "Kirti Nagar", city: "Delhi" },
    { location: "Uttam Nagar", city: "Delhi" },
    { location: "Punjabi Bagh", city: "Delhi" },
    { location: "Hari Nagar", city: "Delhi" },
    { location: "Ramesh Nagar", city: "Delhi" },
    { location: "Loha Mandi", city: "Delhi" },
    { location: "Malviya Nagar", city: "Delhi" },
    { location: "Mahipalpur", city: "Delhi" },
    { location: "Mayapuri", city: "Delhi" },
    { location: "Janakpuri", city: "Delhi" },
    { location: "Dabri", city: "Delhi" },
    { location: "Udyog Nagar", city: "Delhi" },
    { location: "Paschim Vihar", city: "Delhi" },
    { location: "Pitampura", city: "Delhi" },
    { location: "Britannia Chowk", city: "Delhi" },
    { location: "Karol Bagh", city: "Delhi" },
    { location: "East Of Kailash", city: "Delhi" },
    { location: "Peeragarhi", city: "Delhi" },
    { location: "Subhash Nagar", city: "Delhi" },
    { location: "Moti Nagar", city: "Delhi" },
    { location: "Moti Nagar", city: "Delhi" },
    { location: "Moti Nagar", city: "Delhi" },
    { location: "Tilak Nagar", city: "Delhi" },
    { location: "Najafgarh", city: "Delhi" },
    { location: "Bijwasan", city: "Delhi" },
    { location: "Lawrence Road", city: "Delhi" },
    { location: "Mehrauli", city: "Delhi" },
    { location: "Gk 1", city: "Delhi" },
    { location: "Saket", city: "Delhi" },
    { location: "Wazirpur", city: "Delhi" },
    { location: "Dwarka", city: "Delhi" },
    { location: "Rajouri Garden", city: "Delhi" },
    { location: "Vikaspuri", city: "Delhi" },
    { location: "Naraina", city: "Delhi" },
    { location: "Patel Nagar", city: "Delhi" },
    { location: "Rajendra Nagar", city: "Delhi" },
    { location: "Chattarpur", city: "Delhi" },
    { location: "Gt Karnal Road", city: "Delhi" },
    { location: "Sector 14", city: "Delhi" },
    { location: "Sohna Road", city: "Delhi" },
    { location: "Sector 24", city: "Gurugram" },
    { location: "Manesar", city: "Gurugram" },
    { location: "Najafgarh Road Industrial Area", city: "Delhi" },
  ];

  const handleClick = (city, location) => {
    const slug = `/banquet-hall/${city.toLowerCase()}/${location
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    navigate(slug);
  };

  return (
    <section className="bg-[#dc2626] text-white py-6 px-6 text-center relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#b91c1c] to-[#ef4444] opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
          Recent Searches
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-10">
          Explore the most popular banquet hall locations near you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6 text-left">
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => handleClick(loc.city, loc.location)}
              className="relative group text-left text-white/90 font-medium hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="relative inline-block">
                Banquet Hall in {loc.location}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSearches;
