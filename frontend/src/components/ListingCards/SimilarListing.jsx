import { LuArrowLeft, LuArrowRight } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import FoodPrice from "../listingsDetails/FoodPrice"

export default function SimilarListingsSection({ listings }) {
  const navigate = useNavigate()

  if (!Array.isArray(listings) || listings.length === 0) return null

  const scrollLeft = () => {
    document
      .getElementById("similarScroll")
      ?.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    document
      .getElementById("similarScroll")
      ?.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <section className="pt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Similar Banquet Halls
        </h2>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="
          absolute left-6 top-1/2 -translate-y-1/2
          bg-white shadow rounded-full px-5 py-5 z-20
          hover:scale-110 transition
        "
      >
        <LuArrowLeft className="h-6 w-6" />
      </button>

      {/* Scroll Container */}
      <div
        id="similarScroll"
        className="
          flex gap-6
          overflow-x-hidden scroll-smooth no-scrollbar
          px-16 md:px-8 py-10
        "
      >
        {listings.map((item) => (
          <div
            key={item.id}
            className="
              min-w-[330px] max-w-[330px]
              p-4 bg-white rounded-xl
              shadow-[0_8px_24px_rgba(0,0,0,0.1)]
              hover:shadow-[0px_6px_12px_rgba(0,0,0,0.35)]
              transition-all duration-300
              overflow-hidden cursor-pointer
            "
            onClick={() =>
              navigate(`/banquet-hall-in/${item.locality}/${item.id}`)
            }
          >
            {/* Image */}
            <div className="h-42 w-full rounded-md overflow-hidden">
              <img
                src={item.venue_images?.[0]?.image_url || "/placeholder.jpg"}
                alt={item.title}
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="pt-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2">
                {item.excerpt || "Beautiful banquet venue"}
              </p>

              {/* Guests */}
              <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                <HiUserGroup className="h-4 w-4 text-red-600" />
                {item.min_guest} – {item.max_guest} guests
              </div>

              {/* Prices */}
              <FoodPrice
                vegPrice={item.vegPrice}
                nonVegPrice={item.nonVegPrice}
                iconSize={14}
                gap="gap-3"
              />

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(
                    `/banquet-hall-in/${item.locality}/${item.id}`
                  )
                }}
                className="
                  mt-2 w-full cursor-pointer
                  bg-red-600 text-white py-2 rounded-lg
                  hover:bg-red-700 transition
                "
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="
          absolute right-6 top-1/2 -translate-y-1/2
          bg-white shadow rounded-full px-5 py-5 z-20
          hover:scale-110 transition
        "
      >
        <LuArrowRight className="h-6 w-6" />
      </button>
    </section>
  )
}