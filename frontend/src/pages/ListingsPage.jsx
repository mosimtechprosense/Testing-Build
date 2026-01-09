import { useEffect, useMemo, useState } from "react"
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation
} from "react-router-dom"
import FiltersSidebar from "../components/FlitersSidebar/FiltersSidebar"
import ListingCard from "../components/ListingCards/ListingCard"
import {
  fetchListings,
  fetchLocalities,
  fetchLocalityDescription
} from "../api/listingsApi"
import MobileFilters from "../components/mobile/MobileFilters"
import LocalityDescription from "../components/listingsDetails/LocalityDescription"

export default function ListingsPage() {
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

  const slugToServiceName = {
    "banquet-hall": "Banquet Halls",
    "party-hall": "Party Halls",
    "marriage-hall": "Marriage Halls",
    "banquet-with-room": "Banquet With Room",
    "party-lawn": "Party Lawn",
    "5-star-wedding-hotel": "5-Star Wedding Hotel",
    "destination-wedding": "Destination Wedding",
    "wedding-farmhouse": "Wedding Farmhouse",
    "small-function-hall": "Small Function Hall",
    "corporate-event": "Corporate Event",
    "engagement-venue": "Engagement Venue",
    "ring-ceremony": "Ring Ceremony",
    "baby-shower": "Baby Shower",
    "retirement-party": "Retirement Party",
    "sikh-wedding": "Sikh Wedding",
    "mehendi-ceremony": "Mehendi Ceremony"
  }

  const { citySlug } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobilePanel, setMobilePanel] = useState(null)

  const paramsFromUrl = useMemo(() => {
    const obj = Object.fromEntries([...searchParams.entries()])
    ;[
      "skip",
      "take",
      "minBudget",
      "maxBudget",
      "minGuests",
      "maxGuests"
    ].forEach((key) => {
      if (obj[key] !== undefined) obj[key] = Number(obj[key])
    })
    ;["vegetarian", "nonVegetarian"].forEach((key) => {
      if (obj[key] === "true") obj[key] = true
      if (obj[key] === "false") obj[key] = false
    })

    return obj
  }, [searchParams])

  const initial = {
    city: citySlug
      ? decodeURIComponent(citySlug)
      : paramsFromUrl.city || undefined,
    category: paramsFromUrl.category
      ? Number(paramsFromUrl.category)
      : undefined,
    search: paramsFromUrl.search || "",
    locality: paramsFromUrl.locality || undefined,
    venueType: paramsFromUrl.venueType || undefined,
    minBudget: paramsFromUrl.minBudget || undefined,
    maxBudget: paramsFromUrl.maxBudget || undefined,
    minGuests:
      paramsFromUrl.minGuests !== undefined
        ? Number(paramsFromUrl.minGuests)
        : undefined,
    maxGuests:
      paramsFromUrl.maxGuests !== undefined
        ? Number(paramsFromUrl.maxGuests)
        : undefined,
    vegetarian: paramsFromUrl.vegetarian ?? undefined,
    nonVegetarian: paramsFromUrl.nonVegetarian ?? undefined,
    sortBy: paramsFromUrl.sortBy || "created_at",
    order: paramsFromUrl.order || "desc",
    skip: paramsFromUrl.skip || 0,
    take: 10
  }

  const goPage = (pageNumber) => {
    const newSkip = (pageNumber - 1) * (filters.take || 10)
    pushUrl({ skip: newSkip })
  }

  const [filters, setFilters] = useState(initial)
  const [listings, setListings] = useState([])
  const [localities, setLocalities] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const showingFrom = totalCount === 0 ? 0 : filters.skip + 1
  const showingTo = Math.min(filters.skip + filters.take, totalCount)

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category")
    const searchFromUrl = searchParams.get("search")

    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl ? Number(categoryFromUrl) : undefined,

      // keep search if it exists in URL (home page search)
      // clear search only when category exists AND no search param
      search:
        categoryFromUrl && !searchFromUrl ? "" : searchFromUrl ?? prev.search,

      skip: searchParams.get("skip") ? Number(searchParams.get("skip")) : 0
    }))
  }, [searchParams])

  useEffect(() => {
    if (filters.skip === undefined) return

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [filters.skip])

  useEffect(() => {
    fetchLocalities()
      .then((data) => setLocalities(data.data || []))
      .catch(() => setLocalities([]))
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (value === undefined || value === null || value === "") return false
        if (
          ["minBudget", "maxBudget", "skip", "take"].includes(key) &&
          isNaN(Number(value))
        )
          return false
        return true
      })
    )

    cleanedFilters.minGuests = cleanedFilters.minGuests ?? 0
    cleanedFilters.maxGuests = cleanedFilters.maxGuests ?? 1200

    //  If category is selected, search must NOT filter listings
    if (cleanedFilters.category) {
      delete cleanedFilters.search
    }

    if (
      cleanedFilters.search &&
      ["banquet hall", "banquet halls"].includes(
        cleanedFilters.search.toLowerCase().trim()
      )
    ) {
      delete cleanedFilters.search
    }

    if (cleanedFilters.locality) {
      // numeric locality (ID) from sidebar → ignore
      if (typeof cleanedFilters.locality === "number") {
        delete cleanedFilters.locality
      }

      // string locality (home page or URL)
      else if (typeof cleanedFilters.locality === "string") {
        cleanedFilters.locality = cleanedFilters.locality
          .replace(/-/g, " ")
          .toLowerCase()
      }

      // object locality (dropdown option)
      else if (typeof cleanedFilters.locality === "object") {
        cleanedFilters.locality =
          cleanedFilters.locality.slug ||
          cleanedFilters.locality.value ||
          cleanedFilters.locality.name

        cleanedFilters.locality = cleanedFilters.locality
          ?.replace(/-/g, " ")
          .toLowerCase()
      }
    }

    // derive mealType from filters
    if (filters.vegetarian && !filters.nonVegetarian) {
      cleanedFilters.mealType = "veg"
    }

    if (filters.nonVegetarian && !filters.vegetarian) {
      cleanedFilters.mealType = "nonVeg"
    }

    // both checked or none checked → no filtering
    delete cleanedFilters.vegetarian
    delete cleanedFilters.nonVegetarian

    fetchListings(cleanedFilters)
      .then((res) => {
        if (!mounted) return
        setListings(res.data || [])
        setTotalCount(res.total || 0)
      })
      .catch(() => {
        setListings([])
        setTotalCount(0)
      })
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [filters])

  const pushUrl = (obj) => {
    // Merge new values into existing filters
    const merged = { ...filters, ...obj }

    // Reset pagination if any filter changes (not skip itself)
    if (Object.keys(obj).some((key) => key !== "skip")) {
      merged.skip = 0
    }

    // Build query string
    const qs = new URLSearchParams()
    if (merged.search) qs.set("search", merged.search)
    if (merged.skip !== undefined) qs.set("skip", merged.skip)
    qs.set("minGuests", merged.minGuests ?? 0)
    qs.set("maxGuests", merged.maxGuests ?? 1200)
    qs.set("take", merged.take || 10)

    // VEG / NON-VEG URL LOGIC — PUT IT HERE
    if (merged.vegetarian) {
      qs.set("vegetarian", "true")
    } else {
      qs.delete("vegetarian")
    }

    if (merged.nonVegetarian) {
      qs.set("nonVegetarian", "true")
    } else {
      qs.delete("nonVegetarian")
    }

    // Determine the path slug
    const locality =
      obj.locality !== undefined ? obj.locality : filters.locality

    const slug =
      locality && typeof locality === "string"
        ? locality.replace(/\s+/g, "-").toLowerCase()
        : ""

    const serviceSlug =
      filters.category && categoryToSlug[filters.category]
        ? categoryToSlug[filters.category]
        : "banquet-hall"

    const path = slug ? `/${serviceSlug}-in/${slug}` : `/${serviceSlug}-in`

    // Update URL and filters
    navigate(`${path}?${qs.toString()}`, { replace: false })
    setFilters(merged)
  }

  const currentPage = Math.floor((filters.skip || 0) / (filters.take || 10)) + 1
  const totalPages = Math.ceil((totalCount || 0) / (filters.take || 10)) || 1

  // PAGINATION WINDOW (max 10 buttons)
  const MAX_PAGES = 10

  const startPage = Math.floor((currentPage - 1) / MAX_PAGES) * MAX_PAGES + 1

  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPages)

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <div className="min-h bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto md:flex md:space-x-6 gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-72 shrink-0">
          <FiltersSidebar
            filters={filters}
            setFilters={pushUrl}
            localities={localities}
          />
        </aside>

        {/* Listings container */}
        <main className="flex-1 space">
          {/* SCROLL TARGET */}

          {/*TOP HEADERS*/}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
              <h1 className="text-2xl font-bold">
                {filters.category
                  ? `${
                      slugToServiceName[categoryToSlug[filters.category]] ||
                      "Service"
                    }${
                      filters.locality
                        ? ` in ${filters.locality.replace(/-/g, " ")}`
                        : ""
                    }`
                  : filters.locality
                  ? `Listings in ${filters.locality.replace(/-/g, " ")}`
                  : "Listings"}
              </h1>
            </div>

            <div className="text-sm text-gray-600">{totalCount} results</div>
          </div>

          {loading ? (
            <div className="p-6 bg-white rounded shadow text-center">
              Loading…
            </div>
          ) : listings.length === 0 ? (
            <div className="p-8 bg-white rounded shadow text-center">
              No venues match your criteria- Try different{" "}
              <span className="text-red-600 font-semibold">locations.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listings.map((l) => (
                <ListingCard key={String(l.id)} item={l} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 space-y-4">
              <p className="text-sm text-gray-500 text-center">
                Showing {showingFrom} to {showingTo} of {totalCount} results
              </p>

              <div className="flex justify-center gap-2 flex-wrap">
                {/* Prev */}
                <button
                  onClick={() => goPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {/* Page Numbers */}
                {visiblePages.map((p) => {
                  const isActive = p === currentPage

                  return (
                    <button
                      key={p}
                      onClick={() => goPage(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border transition cursor-pointer
        ${
          isActive
            ? "bg-red-600 text-white border-red-600"
            : "text-red-600 border-gray-300 hover:bg-gray-100"
        }`}
                    >
                      {p}
                    </button>
                  )
                })}

                {/* Next */}
                <button
                  onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-15 h-10 flex items-center justify-center rounded-lg border cursor-pointer
          text-gray-400 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <LocalityDescription />

      <MobileFilters
        open={mobilePanel}
        setOpen={setMobilePanel}
        filters={filters}
        setFilters={pushUrl}
        localities={localities}
      />
    </div>
  )
}
