import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { fetchListingById, fetchSimilarListings } from "../api/listingsApi"
import { LuArrowLeft, LuArrowRight, LuX } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"
import FoodPrice from "../components/listingsDetails/FoodPrice"
import { UIContext } from "../store/UIContext"
import SimilarListingsSection from "../components/ListingCards/SimilarListing"
import HallCapacities from "../components/listingsDetails/HallCapacities"
import AboutSection from "../components/listingsDetails/AboutSection"
import FeaturesSection from "../components/listingsDetails/FeaturesSection"
import PoliciesSection from "../components/listingsDetails/PoliciesSection"
import FaqSection from "../components/ListingCards/FaqSection"

export default function ListingDetailsDynamic() {
  const { id } = useParams()

  const [listing, setListing] = useState(null)
  const [similarListings, setSimilarListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const { setPopupOpen } = useContext(UIContext)

  // Image modal
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    Promise.all([fetchListingById(id), fetchSimilarListings(id)])
      .then(([listingRes, similarRes]) => {
        if (!isMounted) return

        const listingData = listingRes?.data?.data || listingRes?.data || null

        setListing(listingData)
        setSimilarListings(similarRes?.data || [])
      })
      .catch(() => {
        setListing(null)
        setSimilarListings([])
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) return <div className="py-20 text-center">Loading…</div>
  if (!listing)
    return <div className="py-20 text-center">Listing not found</div>

  const images = listing.venue_images ?? []
  const keywordsArray = listing.keywords?.split(",") ?? []
  const desc = listing.description ?? ""
  const faqs = Array.isArray(listing?.faqs) ? listing.faqs : []
  const hallCapacities = Array.isArray(listing?.hall_capacities)
    ? listing.hall_capacities
    : []

  return (
    <div className="container mx-auto px-4 py-8 select-none">
      {/* ================= IMAGE GALLERY (RECOMMENDED STYLE) ================= */}
      <div key={id} className="relative mb-12">
        {Array.isArray(images) && images.length > 3 && (
          <button
            onClick={() =>
              document
                .getElementById("imageScroll")
                ?.scrollBy({ left: -400, behavior: "smooth" })
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-5 z-20 cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
          >
            <LuArrowLeft className="h-6 w-6 cursor-pointer text-red-600" />
          </button>
        )}

        <div
          id="imageScroll"
          className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar"
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setActiveImageIndex(i)}
              className="min-w-[600px] h-[300px] rounded-md overflow-hidden shadow cursor-pointer"
            >
              <img
                src={img.image_url}
                alt={listing.title}
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        {images.length > 3 && (
          <button
            onClick={() =>
              document
                .getElementById("imageScroll")
                ?.scrollBy({ left: 400, behavior: "smooth" })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-5 z-20 cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
          >
            <LuArrowRight className="h-6 w-6 cursor-pointer text-red-600" />
          </button>
        )}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-1100 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setActiveImageIndex(null)}
          >
            <LuX />
          </button>

          <button
            className="absolute left-6 bg-white text-3xl shadow rounded-full p-5 z-20 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-125"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === 0
                  ? images.length - 1
                  : activeImageIndex - 1
              )
            }
          >
            <LuArrowLeft className="h-6 w-6" />
          </button>

          <img
            src={images[activeImageIndex].image_url}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />

          <button
            className="absolute right-6 bg-white text-3xl shadow rounded-full p-5 z-20 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-125"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === images.length - 1
                  ? 0
                  : activeImageIndex + 1
              )
            }
          >
            <LuArrowRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold mb-2">
        {listing.title}, {listing.locality}, {listing.city}
      </h1>
      <p className="text-gray-600 mb-4">
        {listing.address},{listing.locality}, {listing.city}, {listing.state}
      </p>

      {/* ================= TAGS ================= */}
      <div className="flex flex-wrap gap-2 mb-8">
        {keywordsArray
          .slice(0, showAllKeywords ? undefined : 5)
          .map((tag, i) => (
            <span key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {tag.trim()}
            </span>
          ))}
        {keywordsArray.length > 5 && (
          <button
            className="text-blue-600"
            onClick={() => setShowAllKeywords(!showAllKeywords)}
          >
            {showAllKeywords ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* ABOUT */}
          <AboutSection description={desc} />

          {/* HALL CAPACITY */}
          <HallCapacities hallCapacities={hallCapacities} />

          {/* FEATURES */}
          <FeaturesSection features={listing.features} />

          {/* POLICIES */}
          <PoliciesSection policies={listing.policies} />

          {/* FAQ */}
          <FaqSection faqs={faqs} />

          {/* MAP */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Location</h2>
            <iframe
              title="map"
              width="100%"
              height="350"
              loading="lazy"
              className="rounded-lg shadow"
              src={`https://www.google.com/maps?q=${listing.lat},${listing.long}&output=embed`}
            />
          </section>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded drop-shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Event Details</h3>
            {/* Guests & Food Price */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <HiUserGroup className="h-4 w-4 text-red-600" />
                {listing.min_guest} – {listing.max_guest} guests
              </span>

              <FoodPrice
                vegPrice={listing.vegPrice}
                nonVegPrice={listing.nonVegPrice}
                iconSize={14}
                gap="gap-4"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded drop-shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p>Phone: {listing.phone}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPopupOpen(true)
              }}
              className="mt-4 w-full
          bg-red-600 text-white py-2 rounded
            cursor-pointer
            transition-all duration-200
          hover:bg-red-700 hover:shadow-md
            active:scale-[0.98]"
            >
              Enquiry Now
            </button>
          </div>
        </div>
      </div>
      {/* SIMILAR LISTINGS */}

      <SimilarListingsSection listings={similarListings} />
    </div>
  )
}