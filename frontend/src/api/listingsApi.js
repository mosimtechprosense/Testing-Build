const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      params.set(key, value);
    }
  });

  const res = await fetch(`${API_BASE}/api/listings?${params.toString()}`); // ✅ add /api
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};


export const fetchLocalities = async (location = "") => {
  const url = `${API_BASE}/locations${location ? `?location=${encodeURIComponent(location)}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};


