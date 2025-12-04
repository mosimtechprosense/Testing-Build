const BASE_API = import.meta.env.VITE_BASE_API || "http://localhost:5000/api";

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== "" && val !== null) params.set(key, val);
  });
  const res = await fetch(`${BASE_API}/listings?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};

export const fetchLocalities = async (city = "") => {
  const url = `${BASE_API}/locations${city ? `?city=${encodeURIComponent(city)}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};

const data = await fetchLocalities("moti-nagar");
console.log(data); // <-- Add this