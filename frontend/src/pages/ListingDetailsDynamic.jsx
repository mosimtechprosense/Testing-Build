import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchListingById, fetchSimilarListings } from "../api/listingsApi"
import { LuArrowLeft, LuArrowRight, LuX } from "react-icons/lu"
import { HiUserGroup } from "react-icons/hi2"

export default function ListingDetailsDynamic() {
  const { id } = useParams()

  const [listing, setListing] = useState(null)
  const [similarListings, setSimilarListings] = useState([])
  const [loading, setLoading] = useState(true)

  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)

  // 🔹 Image modal
  const [activeImageIndex, setActiveImageIndex] = useState(null)

  useEffect(() => {
    setLoading(true)

    Promise.all([fetchListingById(id), fetchSimilarListings(id)])
      .then(([listingRes, similarRes]) => {
        setListing(listingRes.data)
        setSimilarListings(similarRes.data || [])
      })
      .catch(() => {
        setListing(null)
        setSimilarListings([])
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="py-20 text-center">Loading…</div>
  if (!listing) return <div className="py-20 text-center">Listing not found</div>

  const images = listing.venue_images || []
  const keywordsArray = listing.keywords?.split(",") || []
  const desc = listing.description || ""
  const faqs = listing.faqs || []

  // keep same section but ensure UI stability
  const visibleSimilar = similarListings.slice(
    0,
    similarListings.length < 4 ? similarListings.length : similarListings.length
  )

  return (
    <div className="container mx-auto px-4 py-8">

      {/* ================= IMAGE GALLERY (RECOMMENDED STYLE) ================= */}
      <div className="relative mb-12">
        {images.length > 3 && (
          <button
            onClick={() =>
              document
                .getElementById("imageScroll")
                ?.scrollBy({ left: -400, behavior: "smooth" })
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-4 z-20 hover:scale-110 transition"
          >
            <LuArrowLeft />
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
              className="min-w-[320px] h-[260px] rounded-xl overflow-hidden shadow cursor-pointer"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-4 z-20 hover:scale-110 transition"
          >
            <LuArrowRight />
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
            className="absolute left-6 text-white text-3xl"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === 0
                  ? images.length - 1
                  : activeImageIndex - 1
              )
            }
          >
            <LuArrowLeft />
          </button>

          <img
            src={images[activeImageIndex].image_url}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />

          <button
            className="absolute right-6 text-white text-3xl"
            onClick={() =>
              setActiveImageIndex(
                activeImageIndex === images.length - 1
                  ? 0
                  : activeImageIndex + 1
              )
            }
          >
            <LuArrowRight />
          </button>
        </div>
      )}

      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold mb-2">{listing.title}, {listing.locality}, {listing.city}</h1>
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
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              About this Banquet
            </h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  showFullDesc || desc.length <= 300
                    ? desc
                    : desc.slice(0, 300) + "...",
              }}
            />
            {desc.length > 300 && (
              <button
                className="text-blue-600 mt-2"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
            )}
          </section>

          {/* FEATURES */}
          {listing.features && (
            <section>
              <h2 className="text-2xl font-semibold mb-2">Features</h2>
              <div
                className="list-disc ml-5 text-gray-700"
                dangerouslySetInnerHTML={{ __html: listing.features }}
              />
            </section>
          )}

          {/* POLICIES */}
          {listing.policies && (
            <section>
              <h2 className="text-2xl font-semibold mb-2">Venue Policies</h2>
              <div
                className="list-disc ml-5 text-gray-700"
                dangerouslySetInnerHTML={{ __html: listing.policies }}
              />
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border rounded p-4">
                    <p className="font-semibold">{faq.question}</p>
                    <p className="text-gray-700 mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

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
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Event Details</h3>
            <p>
              Guests: {listing.min_guest} – {listing.max_guest}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p>Phone: {listing.phone}</p>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded">
              Enquire Now
            </button>
          </div>
        </div>
      </div>
{/* SIMILAR LISTINGS */}
      {similarListings.length > 0 && (
        <section className="pt-10 relative">
          {/* Header */}
          <div className="flex justify-between items-center px-4 md:px-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Similar Banquet Halls
            </h2>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() =>
              document
                .getElementById("similarScroll")
                .scrollBy({ left: -300, behavior: "smooth" })
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 hover:scale-110 transition"
          >
            <LuArrowLeft className="h-6 w-6" />
          </button>

          {/* Scroll Container */}
          <div
            id="similarScroll"
            className="flex gap-6 overflow-x-hidden scroll-smooth no-scrollbar px-16 md:px-8 py-10"
          >
            {similarListings.map((item) => (
              <div
                key={item.id}
                className="min-w-[290px] max-w-[290px] p-4 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => (window.location.href = `/listing/${item.id}`)}
              >
                {/* Image */}
                <div className="h-42 w-full rounded-md overflow-hidden">
                  <img
                    src={item.venue_images?.[0]?.image_url}
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
                    {item.excerpt || "Beautiful banquet venue"}
                  </p>

                  {/* Guests */}
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-800">
                    <HiUserGroup className="h-4 w-4" />
                    {item.min_guest} – {item.max_guest} guests
                  </div>

                  {/* Button */}
                  <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg cursor-pointer hover:bg-red-700 transition">
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              document
                .getElementById("similarScroll")
                .scrollBy({ left: 300, behavior: "smooth" })
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-5 py-5 z-20 hover:scale-110 transition"
          >
            <LuArrowRight className="h-6 w-6" />
          </button>
        </section>
      )}
      
    </div>
  )
}