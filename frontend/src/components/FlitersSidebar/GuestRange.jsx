import { useState } from "react";
import { Range } from "react-range";

export default function GuestRange({ onChange }) {
  const min = 0;
  const max = 1200;

  const [localValue, setLocalValue] = useState([min, max]);

  const handleChange = (newValues) => {
    const sorted = [...newValues].sort((a, b) => a - b);
    setLocalValue(sorted);
    onChange && onChange(sorted);
  };

  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      <label className="font-semibold text-sm">Guests</label>

      {/* Slider */}
      <Range
        step={1}
        min={min}
        max={max}
        values={localValue}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
  const newProps = { ...props };
  delete newProps.key;

  return (
    <div
      {...newProps}
      className="relative w-full h-2 rounded mt-2 bg-gray-300"
      style={{ ...newProps.style }}
    >
      <div
        className="absolute h-2 rounded bg-red-500"
        style={{
          left: `${(localValue[0] / max) * 100}%`,
          right: `${100 - (localValue[1] / max) * 100}%`,
        }}
      />
      {children}
    </div>
  );
}}

        renderThumb={({ props }) => {
  const newProps = { ...props };
  delete newProps.key;

  return (
    <div
      {...newProps}
      className="w-4.5 h-4.5 bg-white border-2 border-red-500 rounded-full shadow-md cursor-pointer"
      style={{ ...newProps.style }}
    />
  );
}}

      />

      {/* Inputs */}
      <div className="flex items-center gap-2 mt-4 w-full min-w-0">
        
        {/* Min Input */}
        <input
          type="text"
          className="flex-1 min-w-0 border border-gray-300 rounded px-1.5 py-1 text-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-red-400"
          value={localValue[0].toString()}
          onChange={(e) => {
            let newMin = Number(e.target.value.replace(/\D/g, ""));
            newMin = Math.max(min, Math.min(newMin, localValue[1]));
            handleChange([newMin, localValue[1]]);
          }}
        />

        <span className="text-gray-600">—</span>

        {/* Max Input */}
        <input
          type="text"
          className="flex-1 min-w-0 border border-gray-300 rounded px-1.5 py-1 text-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-red-400"
          value={
            localValue[1] === max
              ? `${localValue[1]}+`
              : `${localValue[1]}`
          }
          onChange={(e) => {
            let newMax = Number(e.target.value.replace(/\D/g, ""));
            newMax = Math.min(max, Math.max(newMax, localValue[0]));
            handleChange([localValue[0], newMax]);
          }}
        />
      </div>
    </div>
  );
}
