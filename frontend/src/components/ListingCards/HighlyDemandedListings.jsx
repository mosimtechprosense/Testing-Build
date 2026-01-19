import { useEffect, useState } from "react"
import axios from "axios"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import FoodPrice from "../listingsDetails/FoodPrice"

const HighlyDemandedListings = () => {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  const API_BASE = import.meta.env.VITE_API_BASE

  //fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/listings/high-demand`)
        setListings(res.data.data || [])
      } catch (error) {
        console.error("Error fetching high demanded listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [API_BASE])

  // handle clicked on view details
  const slugifyLocality = (locality = "") =>
    locality.toLowerCase().trim().replace(/\s+/g, "-")

  // if loading
  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold text-gray-600">
        Loading highly demanded listings...
      </div>
    )
  }

  return (
    <section className="pt-8 relative">
      {/* Section Header */}
      <div className="flex justify-between items-center px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Highly Demanded Halls
        </h2>

        <button className="text-md font-semibold text-red-600 cursor-pointer hover:text-red-700">
          View All →
        </button>
      </div>

      {/* Left Scroll Button */}
      <button
        onClick={() =>
          document
            .getElementById("highDemandScroll")
            .scrollBy({ left: -300, behavior: "smooth" })
        }
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 transition duration-300 ease-in-out transform hover:scale-125 hover:text-red-600"
      >
        <LuArrowLeft className="h-6 w-6 cursor-pointer" />
      </button>

      {/* Scroll Container */}
      <div
        id="highDemandScroll"
        className="flex gap-6 overflow-x-hidden scroll-smooth no-scrollbar select-none px-16 md:px-8 py-10"
      >
        {listings.map((item) => (
          <div
            key={item.id}
            className="min-w-[330px] max-w-[330px] p-4 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => {
              const localitySlug = slugifyLocality(item.locality)
              navigate(`/banquet-hall-in/${localitySlug}/${item.id}`)
            }}
          >
            {/* Image */}
            <div className="h-42 w-full rounded-md overflow-hidden">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.excerpt}
              </p>

              {/* Guests */}
              <div className="mt-3 flex items-center text-sm font-medium text-gray-800">
                <HiUserGroup className="h-4 w-4 mr-1" />
                {item.capacityFrom && item.capacityTo
                  ? `${item.capacityFrom}-${item.capacityTo} Guests`
                  : "No guest range available"}
              </div>
              {/* Price */}
              <div className="mt-3">
                <FoodPrice
                  vegPrice={item.vegPrice}
                  nonVegPrice={item.nonVegPrice}
                />
              </div>
              {/* Button */}
              <button className="mt-4 w-full text-sm bg-red-600 text-white py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-all">
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}

      <button
        onClick={() =>
          document
            .getElementById("highDemandScroll")
            .scrollBy({ left: 300, behavior: "smooth" })
        }
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 transition duration-300 ease-in-out transform hover:scale-125 hover:text-red-600"
      >
        <LuArrowRight className="h-6 w-6 cursor-pointer" />
      </button>
    </section>
  )
}

export default HighlyDemandedListings
