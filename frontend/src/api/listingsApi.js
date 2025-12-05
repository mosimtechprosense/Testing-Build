const BASE_API = import.meta.env.VITE_BASE_API || "http://localhost:5000/api";

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      params.set(key, value);
    }
  });

  const res = await fetch(`${BASE_API}/listings?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};


export const fetchLocalities = async (location = "") => {
  const url = `${BASE_API}/locations${location ? `?location=${encodeURIComponent(location)}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};
