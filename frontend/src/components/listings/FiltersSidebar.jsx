import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import PriceRange from "./PriceRange";

export default function FiltersSidebar({ filters, setFilters }) {
  const [locationQuery, setLocationQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  // Fetch all locations (same as Home page)
  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => {
        const locs = data.data || [];
        setLocations(locs);
        setFilteredLocations(locs);
      })
      .catch(() => setLocations([]));
  }, []);

  // When user types in input
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationQuery(value);

    const filtered = locations.filter((loc) => {
      const nameMatch = loc.name?.toLowerCase().includes(value.toLowerCase());
      const cityMatch = loc.city?.name
        ?.toLowerCase()
        .includes(value.toLowerCase());
      return nameMatch || cityMatch;
    });

    setFilteredLocations(filtered);
  };

  const handleSelectLocation = (loc) => {
    setLocationQuery(`${loc.name}, ${loc.city?.name || ""}`);
    setShowLocationSuggestions(false);

    // Set proper ID to filters
    setFilters({ locality: loc.id, skip: 0 });
  };

  return (
    <aside className="bg-white p-4 rounded-lg shadow w-full md:w-72">
      {/* Search */}
      <div>
        <label className="font-semibold text-sm">Search</label>
        <input
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value, skip: 0 })}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="Search venues..."
        />
      </div>

      <hr className="my-4" />

      {/* Location (Dropdown like Home Page) */}
      <div>
        <label className="font-semibold text-sm">Location</label>

        <div className="relative mt-2">
          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <CiLocationOn className="text-gray-600 text-lg" />

            <input
              type="text"
              value={locationQuery}
              onChange={handleLocationChange}
              onFocus={() => setShowLocationSuggestions(true)}
              placeholder="Enter your location"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Dropdown */}
          {showLocationSuggestions && filteredLocations.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-50">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <CiLocationOn className="mr-2 text-gray-500" />
                  <div>
                    <h5 className="text-sm font-medium">{loc.name}</h5>
                    {loc.city?.name && (
                      <p className="text-xs text-gray-500">
                        {loc.city.name}
                      </p>
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
        <label className="font-semibold text-sm">Price</label>
        <PriceRange
          value={[filters.minBudget, filters.maxBudget]}
          onChange={([minBudget, maxBudget]) =>
            setFilters({ minBudget, maxBudget, skip: 0 })
          }
        />
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
                  skip: 0,
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
                  nonVegetarian:
                    filters.nonVegetarian === "true" ? "" : "true",
                  skip: 0,
                })
              }
            />
            Non-Vegetarian
          </label>
        </div>
      </div>
    </aside>
  );
}
