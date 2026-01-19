import { HiUserGroup } from "react-icons/hi"
import FoodPrice from "../../components/listingsDetails/FoodPrice"
import sidebarImg from "../../assets/sidebarimage.avif"

export default function ListingDetailsSidebar({ listing, setPopupOpen }) {
  return (
    <aside className="mt-4 lg:mt-0">
      <div
        className="
          relative
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          pb-[300px] lg:pb-[400px]   /* ⬅ smaller image space on mobile */
        "
      >
        {/* ===== FLOATING CONTENT ===== */}
        <div className="relative z-10 p-3 lg:p-4 space-y-4 lg:space-y-6">
          {/* Event Details */}
          <div className="bg-white rounded-xl shadow p-3 lg:p-4">
            <h3 className="text-base lg:text-lg font-semibold mb-1 lg:mb-2">
              Event Details
            </h3>

            <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-xs lg:text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <HiUserGroup className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-red-600" />
                {listing.min_guest} – {listing.max_guest} guests
              </span>

              <FoodPrice
                vegPrice={listing.vegPrice}
                nonVegPrice={listing.nonVegPrice}
                iconSize={12} /* smaller icons on mobile */
                gap="gap-3 lg:gap-4"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl shadow p-3 lg:p-4">
            <h3 className="text-base lg:text-lg font-semibold mb-1 lg:mb-2">
              Contact
            </h3>

            <p className="text-xs lg:text-sm text-gray-700">
              Phone: <span className="font-medium">{listing.phone}</span>
            </p>

            <button
              onClick={() => setPopupOpen(true)}
              className="
                mt-3 lg:mt-4 w-full
                bg-red-600 text-white
                py-2 lg:py-2.5
                text-sm lg:text-base
                rounded-xl
                font-semibold
                hover:bg-red-700 transition cursor-pointer
                active:scale-[0.98]
              "
            >
              Enquiry Now
            </button>
          </div>
        </div>

        {/* ===== IMAGE AT BOTTOM ===== */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] lg:h-[400px]">
          <img
            src={sidebarImg}
            alt="Venue"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  )
}
