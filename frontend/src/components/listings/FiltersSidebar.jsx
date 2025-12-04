import PriceRange from "./PriceRange";

export default function FiltersSidebar({ filters, setFilters, localities }) {
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

      {/* Localities */}
      <div>
        <label className="font-semibold text-sm">Locality</label>

        <div className="flex flex-wrap gap-2 mt-2">
          {localities.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilters({ locality: loc, skip: 0 })}
              className={`px-2 py-1 rounded text-sm ${
                filters.locality === loc
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {loc}
            </button>
          ))}
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

        <div className="flex flex-col gap-2 mt-2">
          {/* Veg */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.vegetarian === "true"}
              onChange={() =>
                setFilters({
                  vegetarian:
                    filters.vegetarian === "true" ? "" : "true",
                  skip: 0,
                })
              }
            />
            Vegetarian
          </label>

          {/* Non-Veg */}
          <label className="flex items-center gap-2 text-sm">
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
            Non Vegetarian
          </label>
        </div>
      </div>
    </aside>
  );
}
