import { useNavigate, useParams, useSearchParams } from "react-router-dom"
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
  const { setPopupOpen } = useContext(UIContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

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

  // breadcrumb logic (inline) //* seprate this as a component in future
  const categoryToVenuePath = {
    6: { path: "/venues/banquet-halls", label: "Banquet Halls" },
    7: { path: "/venues/party-halls", label: "Party Halls" },
    8: { path: "/venues/marriage-halls", label: "Marriage Halls" },
    9: { path: "/venues/banquet-with-room", label: "Banquet with Hotel Room" },
    10: { path: "/venues/party-lawn", label: "Party Lawn" },
    11: {
      path: "/venues/5-star-wedding-hotels",
      label: "5 Star Wedding Hotels"
    },
    12: { path: "/venues/destination-weddings", label: "Destination Weddings" },
    13: { path: "/venues/wedding-farmhouse", label: "Wedding Farmhouse" },
    14: { path: "/venues/small-function-halls", label: "Small Function Halls" },
    15: { path: "/venues/corporate-events", label: "Corporate Events" },
    16: { path: "/venues/engagement-venue", label: "Engagement Venue" },
    17: { path: "/venues/ring-ceremony", label: "Ring Ceremony" },
    18: { path: "/venues/baby-shower", label: "Baby Shower" },
    19: { path: "/venues/retirement-party", label: "Retirement Party" },
    20: { path: "/venues/sikh-wedding", label: "Sikh Wedding" },
    21: { path: "/venues/mehendi-ceremony", label: "Mehendi Ceremony" }
  }

  const categoryToSlug = {
    6: "banquet-hall",
    7: "party-hall",
    8: "marriage-hall",
    9: "banquet-with-room",
    10: "party-lawn",
    11: "5-star-wedding-hotel",
    12: "destination-wedding",
    13: "wedding-farmhouse",
    14: "small-function-hall",
    15: "corporate-event",
    16: "engagement-venue",
    17: "ring-ceremony",
    18: "baby-shower",
    19: "retirement-party",
    20: "sikh-wedding",
    21: "mehendi-ceremony"
  }

  const categoryId =
    Number(categoryFromUrl) ||
    listing.category_id ||
    listing.category?.id ||
    listing.categoryId ||
    listing.categories?.[0]?.id ||
    6
  const serviceSlug = categoryToSlug[Number(categoryId)] || "banquet-hall"
  const venueMeta = categoryToVenuePath[categoryId]

  const breadcrumbItems = [
    { label: "Home", type: "home", path: "/" },
    {
      label: venueMeta?.label || "Banquet Halls",
      type: "service",
      path: `/${serviceSlug}-in?category=${categoryId}`
    }
  ]

  if (listing.locality) {
    const localitySlug = listing.locality.replace(/\s+/g, "-").toLowerCase()
    breadcrumbItems.push({
      label: `${venueMeta?.label || "Banquet Halls"} in ${listing.locality}`,
      type: "locality",
      path: `/${serviceSlug}-in/${localitySlug}?category=${categoryId}&locality=${localitySlug}`
    })
  }

  // Current listing (not clickable)
  breadcrumbItems.push({
    label: listing.title,
    type: "current"
  })

  const pushUrl = ({ category, citySlug }) => {
    const qs = new URLSearchParams()
    if (category) qs.set("category", category)
    if (citySlug) qs.set("locality", citySlug)

    const slug = citySlug ? citySlug.replace(/\s+/g, "-").toLowerCase() : ""
    const serviceSlug = categoryToSlug[Number(category)] || "banquet-hall"
    const path = slug ? `/${serviceSlug}-in/${slug}` : `/${serviceSlug}-in`

    navigate(`${path}?${qs.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="py-3 px-4 mb-3 text-sm text-red-600"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {breadcrumbItems.map((item, idx) => {
            const isLast = item.type === "current"
            return (
              <li key={idx} className="flex items-center gap-1 truncate">
                {!isLast ? (
                  <>
                    <span
                      className="cursor-pointer font-medium hover:text-gray-800 whitespace-nowrap"
                      onClick={() => {
                        if (!item.path) return
                        const url = new URL(item.path, window.location.origin)
                        const params = Object.fromEntries(
                          url.searchParams.entries()
                        )
                        pushUrl({
                          category: params.category,
                          citySlug: params.locality
                        })
                      }}
                    >
                      {item.label}
                    </span>

                    <span className="mx-1">/</span>
                  </>
                ) : (
                  <span className="text-gray-600 truncate">{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

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
