export default function TagsFilter({ filters, setFilters }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.recommended === "true"}
          onChange={() =>
            setFilters({
              recommended: filters.recommended === "true" ? "" : "true",
              skip: 0,
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
              skip: 0,
            })
          }
        />
        High Demand
      </label>
    </div>
  );
}
