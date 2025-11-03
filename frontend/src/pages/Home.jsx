import { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import { IoIosSearch } from "react-icons/io"
import homeWalpaper from "../assets/homeWalpaper.avif"
import CustomerReview from "../components/CustomerReview"
import HowItWorks from "../components/HowItWorks"
import Categories from "../components/Categories"
import WhyUsSection from "../components/WhyUsSection"
import { Navigate } from "react-router-dom"
import OfferBanner from "../components/OfferBanner"

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
    { name: "Groom Wear" }
  ]

  // search services state
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredServices, setFilteredServices] = useState(services)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // search locations state
  const [locationQuery, setLocationQuery] = useState("")
  const [locations, setLocations] = useState([]) // full list from API
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  // Fetch locations once on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.data || [])
        setFilteredLocations(data.data || [])
      })
      .catch((err) => {
        console.error("Error fetching locations:", err)
        setLocations([])
        setFilteredLocations([])
      })
  }, [])

  // venues & services handlers
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    const filtered = services.filter((service) =>
      service.name.toLowerCase().startsWith(value.toLowerCase())
    )
    setFilteredServices(filtered)
  }

  const handleSelectService = (name) => {
    setSearchQuery(name)
    setShowSuggestions(false)
  }

  // location handlers
  const handleLocationChange = (e) => {
    const value = e.target.value
    setLocationQuery(value)

    // filter by name or city name (case-insensitive)
    const filtered = locations.filter((loc) => {
      const nameMatch = loc.name?.toLowerCase().includes(value.toLowerCase())
      const cityMatch = loc.city?.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
      return nameMatch || cityMatch
    })
    setFilteredLocations(filtered)
  }

  const handleSelectLocation = (name) => {
    setLocationQuery(name)
    setShowLocationSuggestions(false)
  }

  // close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false)
      setShowLocationSuggestions(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])


  // search handler
  const handleSearchClick = () => {

     Navigate('/venues/testpage');
    
  }



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
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-snug select-none"
            style={{
              textShadow: "2px 2px 10px rgba(0,0,0,0.8)"
            }}
          >
            Your Dream Wedding Starts Here — Explore Venues, Decor & More!
          </h1>
        </div>

        {/*  Search Bar */}
        <div className="flex items-center justify-center w-full px-6">
          <div className="relative flex flex-col sm:flex-row  bg-white border border-[#b4b4be] rounded-md shadow-md w-[98%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] max-w-[1100px]">
            {/*  Venues & Services Input */}
            <div className="relative flex items-center gap-2 w-full sm:w-[60%] py-4 px-5 text-[15px] border-b sm:border-b-0 sm:border-r border-gray-300">
              <IoIosSearch className="text-gray-700 text-xl cursor-default" />
              <input
                type="text"
                placeholder="Search for venues, decor, services..."
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  setShowSuggestions(true)
                  setShowLocationSuggestions(false)
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {showSuggestions && (
                <div
                  className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-[225px] sm:max-h-[165px] overflow-y-auto z-50 shadow-md rounded scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredServices.length > 0 ? (
                    filteredServices.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectService(item.name)}
                        className="flex items-center px-3.5 py-3 text-gray-700 text-sm border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
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
            <div className="relative flex items-center gap-1.5 w-full sm:w-[40%] py-4 px-5 text-[14px] bg-white rounded-r-xs">
              <CiLocationOn className="text-gray-700 text-xl cursor-default" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full text-gray-700 placeholder-gray-500 outline-none cursor-pointer"
                value={locationQuery}
                onChange={handleLocationChange}
                onFocus={() => {
                  setShowLocationSuggestions(true)
                  setShowSuggestions(false)
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {showLocationSuggestions && filteredLocations.length > 0 && (
                <div
                  className="absolute top-[98%] left-0 w-full bg-white border border-gray-300 max-h-[225px] sm:max-h-[170px] overflow-y-auto z-[200] shadow-lg rounded-b-sm scrollbar-hide"
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectLocation(loc.name)}
                      className="flex items-center px-3 py-2.5 z-[100] text-black text-sm outline-none border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="mr-3 p-2 rounded-full bg-gray-100">
                        <CiLocationOn className="text-gray-500" />
                      </div>

                      <div>
                        <h5 className="text-m text-[#414146]">{loc.name}</h5>
                        {loc.city?.name && (
                          <h6 className="text-xs text-[#787887]">
                            {loc.city.name}
                          </h6>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/*  Search Button */}
            <button onClick={handleSearchClick} className="bg-[#dc2626] text-white px-7 py-4 z-0 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-[#b91c1c] transition-all w-full sm:w-auto text-base font-semibold">
              {/* Show icon on larger screens, text on small screens */}
              <span className="block sm:hidden">Search</span>
              <FaSearch className="hidden sm:block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>


       {/* why us section removed as per instructions ( delete this on final production) */}
      {/*  Why Us Section */}
      {/* <WhyUsSection />  */}

      <OfferBanner/>

      {/*  Category section */}
      <Categories />

      {/* Customer Review Section */}
      <CustomerReview />

      {/*How It Works Section*/}
      <HowItWorks />
    </div>
  )
}

export default Home
