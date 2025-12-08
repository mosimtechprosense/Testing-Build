import { useState } from "react"

export default function SortFilter({ filters, setFilters }) {
  const sortOptions = [
    { id: "created_at", label: "Newest" },
    { id: "price_low", label: "Price: Low to High" },
    { id: "price_high", label: "Price: High to Low" }
  ]

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = sortOptions.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (item) => {
    setQuery(item.label)
    setFilters({ sortBy: item.id, skip: 0 })
    setOpen(false)
  }

  return (
    <div>
      <label className="font-semibold text-sm">Sort By</label>

      <div className="relative mt-2">
        <input
          value={
            query ||
            sortOptions.find((o) => o.id === filters.sortBy)?.label ||
            ""
          }
          onChange={(e) => (setQuery(e.target.value), setOpen(true))}
          onFocus={() => setOpen(true)}
          placeholder="Sort by"
          className="w-full h-9 border border-gray-300 rounded px-3 text-sm 
  shadow-inner shadow-gray-200 focus:ring-2 focus:ring-red-400 bg-transparent outline-none"
        />

        {open && filtered.length > 0 && (
          <div
            className="absolute left-0 right-0 bg-white border border-gray-300
          rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none"
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center text-[#09122C] text-sm py-2 px-3
                hover:bg-[#f3f3f3] hover:text-[#e71717] rounded w-full cursor-pointer"
              >
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
