import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import PriceRange from "./PriceRange"
import GuestRange from "./GuestRange"

export default function FiltersSidebar({ filters, setFilters }) {
  // venue type data
  const venueTypeOptions = [
    { id: "banquet", label: "Banquet Halls", path: "/venues/banquet-halls" },
    {
      id: "marriage-gardens",
      label: "Marriage Gardens",
      path: "/venues/marriage-gardens"
    },
    {
      id: "wedding-farmhouse",
      label: "Wedding Farmhouse",
      path: "/venues/wedding-farmhouse"
    },
    { id: "party-halls", label: "Party Halls", path: "/venues/party-halls" },
    {
      id: "five-star-hotels",
      label: "5 Star Wedding Hotels",
      path: "/venues/5-star-wedding-hotels"
    },
    {
      id: "destination-weddings",
      label: "Destination Weddings",
      path: "/venues/destination-weddings"
    },
    {
      id: "makeup-artists",
      label: "Makeup Artists",
      path: "/vendors/makeup-artists"
    },
    {
      id: "mehandi-artists",
      label: "Mehandi Artists",
      path: "/vendors/mehandi-artists"
    },
    { id: "decorators", label: "Decorators", path: "/vendors/decorators" },
    {
      id: "invitation-cards",
      label: "Invitation Cards",
      path: "/vendors/invitation-cards"
    },
    {
      id: "choreographers",
      label: "Choreographers / Dancers",
      path: "/vendors/choreographers-dancers"
    },
    {
      id: "photographers",
      label: "Photographers / Videography",
      path: "/vendors/photographers-videography"
    },
    {
      id: "wedding-bands",
      label: "Wedding Bands",
      path: "/vendors/wedding-bands"
    },
    {
      id: "transportation",
      label: "Wedding Transportation",
      path: "/vendors/transportation-vintage-cars"
    },
    { id: "bridal-wear", label: "Bridal Wear", path: "/vendors/bridal-wear" },
    { id: "groom-wear", label: "Groom Wear", path: "/vendors/groom-wear" }
  ]

  const [locationQuery, setLocationQuery] = useState("")
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [venueOpen, setVenueOpen] = useState(false)
  const [venueQuery, setVenueQuery] = useState("")
  const [filteredVenueTypes, setFilteredVenueTypes] = useState(venueTypeOptions)

  // Fetch all locations (same as Home)
  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => {
        const locs = data.data || []
        setLocations(locs)
        setFilteredLocations(locs)
      })
      .catch(() => setLocations([]))
  }, [])

  const handleLocationChange = (e) => {
    const value = e.target.value
    setLocationQuery(value)

    const filtered = locations.filter((loc) => {
      const nameMatch = loc.name?.toLowerCase().includes(value.toLowerCase())
      const cityMatch = loc.city?.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
      return nameMatch || cityMatch
    })

    setFilteredLocations(filtered)
  }

  // location handler
  const handleSelectLocation = (loc) => {
    setLocationQuery(`${loc.name} ${loc.city?.name || ""}`)
    setShowLocationSuggestions(false)

    setFilters({ locality: loc.id, skip: 0 })
  }

  // venue handler
  const handleVenueChange = (e) => {
    const value = e.target.value
    setVenueQuery(value)

    const filtered = venueTypeOptions.filter((v) =>
      v.label.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredVenueTypes(filtered)
    setVenueOpen(true) // open dropdown on typing
  }

  return (
    <aside className="bg-white p-4 rounded-lg shadow w-full md:w-72 overflow-visible">
      {/* Search */}
      <div>
        <label className="font-semibold text-sm">Search</label>
        <input
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value, skip: 0 })}
          className="w-full h-9 border border-gray-300 rounded px-3 text-sm shadow-inner shadow-gray-200 mt-1 focus:ring-2 focus:ring-red-400 focus:outline-none"
          placeholder="Search venues..."
        />
      </div>

      <hr className="my-4" />

      {/* Location */}
      <div>
        <label className="font-semibold text-sm">Location</label>

        <div className="relative mt-2">
          <div className="flex items-center gap-2 w-full h-9 border border-gray-300 rounded px-3 shadow-inner shadow-gray-200 mt-1 focus-within:ring-2 focus-within:ring-red-400">
            <CiLocationOn className="text-gray-600 text-lg" />

            <input
              type="text"
              value={locationQuery}
              onChange={handleLocationChange}
              onFocus={() => setShowLocationSuggestions(true)}
              placeholder="Enter your location"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {showLocationSuggestions && filteredLocations.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="flex items-center text-[#09122C] text-sm py-2 px-3 hover:bg-[#f3f3f3] hover:text-[#e71717] rounded w-full cursor-pointer"
                >
                  <CiLocationOn className="mr-2 text-gray-500" />

                  <div>
                    <h5>{loc.name}</h5>
                    {loc.city?.name && (
                      <p className="text-xs text-gray-500">{loc.city.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Price Range */}
      <div>
        <PriceRange
          value={[filters.minBudget, filters.maxBudget]}
          onChange={([minBudget, maxBudget]) =>
            setFilters({ minBudget, maxBudget, skip: 0 })
          }
        />
      </div>

      <hr className="my-4" />

      {/* Guests */}
      <GuestRange
        value={[filters.minGuests || 0, filters.maxGuests || 1200]}
        onChange={([minGuests, maxGuests]) =>
          setFilters({ minGuests, maxGuests, skip: 0 })
        }
      />

      <hr className="my-4" />

      {/* Venue Type */}
      <div>
        <label className="font-semibold text-sm">Venue Type</label>

        <div className="relative mt-2">
          <div className="flex items-center w-full h-9 border border-gray-300 rounded px-3 shadow-[inset_0_0_6px_rgba(0,0,0,0.15)] mt-1 focus-within:shadow-[inset_0_0_8px_rgba(248,113,113,0.7)] focus-within:ring-2 focus-within:ring-red-400">
            <input
              type="text"
              value={venueQuery}
              onChange={handleVenueChange}
              onFocus={() => setVenueOpen(true)}
              placeholder="Select venue type"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {venueOpen && filteredVenueTypes.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
              {filteredVenueTypes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setVenueQuery(item.label)
                    setFilters({ venueType: item.id, skip: 0 })
                    setVenueOpen(false)
                  }}
                  className="text-[#09122C] text-sm py-2 px-3 hover:bg-[#f3f3f3] hover:text-[#e71717] rounded w-full cursor-pointer"
                >
                  <div>
                    <h5>{item.label}</h5>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Meal Type */}
      <div>
        <label className="font-semibold text-sm">Meal Type</label>
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.vegetarian === "true"}
              onChange={() =>
                setFilters({
                  vegetarian: filters.vegetarian === "true" ? "" : "true",
                  skip: 0
                })
              }
            />
            Vegetarian
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.nonVegetarian === "true"}
              onChange={() =>
                setFilters({
                  nonVegetarian: filters.nonVegetarian === "true" ? "" : "true",
                  skip: 0
                })
              }
            />
            Non-Vegetarian
          </label>
        </div>
      </div>

      <hr className="my-4" />

      {/* Recommended & High Demand */}
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.recommended === "true"}
            onChange={() =>
              setFilters({
                recommended: filters.recommended === "true" ? "" : "true",
                skip: 0
              })
            }
          />
          Recommended
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.highDemand === "true"}
            onChange={() =>
              setFilters({
                highDemand: filters.highDemand === "true" ? "" : "true",
                skip: 0
              })
            }
          />
          High Demand
        </label>
      </div>

      <hr className="my-4" />

{/* Sort By */}
<div>
  <label className="font-semibold text-sm">Sort By</label>

  <div className="relative mt-2">
    <div className="flex items-center w-full h-9 border border-gray-300 rounded px-3 shadow-[inset_0_0_6px_rgba(0,0,0,0.15)] mt-1 focus-within:shadow-[inset_0_0_8px_rgba(248,113,113,0.7)] focus-within:ring-2 focus-within:ring-red-400">

      <select
        value={filters.sortBy || "created_at"}
        onChange={(e) => setFilters({ sortBy: e.target.value, skip: 0 })}
        className="w-full outline-none bg-transparent text-sm text-[#09122C] cursor-pointer"
      >
        <option
          value="created_at"
          className="text-[#09122C] text-sm bg-white"
        >
          Newest
        </option>

        <option
          value="price_low"
          className="text-[#09122C] text-sm bg-white"
        >
          Price: Low to High
        </option>

        <option
          value="price_high"
          className="text-[#09122C] text-sm bg-white"
        >
          Price: High to Low
        </option>
      </select>

    </div>
  </div>
</div>



    </aside>
  )
}