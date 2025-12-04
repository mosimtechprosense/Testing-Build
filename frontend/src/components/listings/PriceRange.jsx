import { useEffect, useState } from "react";

export default function PriceRange({ min = 0, max = 20000, value, onChange }) {
  const [localValue, setLocalValue] = useState(value || [min, max]);

  useEffect(() => {
    if (value) setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    setLocalValue([Number(e.target.value), localValue[1]]);
  };

  const handleMaxChange = (e) => {
    setLocalValue([localValue[0], Number(e.target.value)]);
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Min Price */}
      <input
        type="number"
        className="w-20 border px-2 py-1 rounded"
        value={localValue[0]}
        onChange={handleMinChange}
      />

      <span>—</span>

      {/* Max Price */}
      <input
        type="number"
        className="w-20 border px-2 py-1 rounded"
        value={localValue[1]}
        onChange={handleMaxChange}
      />

      <button
        onClick={() => onChange(localValue)}
        className="ml-auto bg-indigo-600 text-white px-3 py-1 rounded"
      >
        Apply
      </button>
    </div>
  );
}
