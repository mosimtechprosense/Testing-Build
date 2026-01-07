import { useEffect, useRef, useState } from "react";

export default function VenueTypeFilter({ setFilters }) {
  const venueTypeOptions = [
    { id: "banquet", label: "Banquet Halls" },
    { id: "marriage-gardens", label: "Marriage Gardens" },
    { id: "wedding-farmhouse", label: "Wedding Farmhouse" },
    { id: "party-halls", label: "Party Halls" },
    { id: "five-star-hotels", label: "5 Star Wedding Hotels" },
    { id: "destination-weddings", label: "Destination Weddings" },
    { id: "makeup-artists", label: "Makeup Artists" },
    { id: "mehandi-artists", label: "Mehandi Artists" },
    { id: "decorators", label: "Decorators" },
    { id: "invitation-cards", label: "Invitation Cards" },
    { id: "choreographers", label: "Choreographers / Dancers" },
    { id: "photographers", label: "Photographers / Videography" },
    { id: "wedding-bands", label: "Wedding Bands" },
    { id: "transportation", label: "Wedding Transportation" },
    { id: "bridal-wear", label: "Bridal Wear" },
    { id: "groom-wear", label: "Groom Wear" },
  ];

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  // handle closed dropdown when click outside
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const filtered = venueTypeOptions.filter((v) =>
    v.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={dropdownRef}>
      <label className="font-semibold text-sm">Venue Type</label>

      <div className="relative mt-2">
        {/* INPUT */}
        <div className="flex items-center w-full h-9 border border-gray-300 rounded px-3 shadow-inner shadow-gray-200 focus-within:ring-2 focus-within:ring-red-400 bg-white">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Select venue type"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* DROPDOWN */}
        {open && filtered.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-56 overflow-y-auto shadow-lg z-[999] scrollbar-none">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuery(item.label);
                  setFilters({ venueType: item.id, skip: 0 });
                  setOpen(false);
                }}
                className="flex items-center text-[#09122C] text-sm py-2 px-3 hover:bg-[#f3f3f3] hover:text-[#e71717] rounded cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
