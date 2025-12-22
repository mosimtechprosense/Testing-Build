const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(key) && isNaN(Number(value)))
    ) {
      params.set(
        key,
        key === "locality"
          ? String(value).replace(/-/g, " ")
          : String(value)
      );
    }
  });

  const url = `${API_BASE}/api/listings?${params.toString()}`;
  console.log("🌐 fetchListings URL:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};


export const fetchListingById = async (id) => {
  if (!id) throw new Error("Listing ID is required")

  const res = await fetch(`${API_BASE}/api/listings/${id}`)

  if (!res.ok) throw new Error("Failed to fetch listing")

  return res.json()
}


export const fetchSimilarListings = async (id) => {
  if (!id) throw new Error("Listing ID is required for similar listings");

  const res = await fetch(`${API_BASE}/api/listings/${id}/similar`);
  if (!res.ok) throw new Error("Failed to fetch similar listings");

  return res.json(); // returns { success, count, data: [...] }
};





export const fetchLocalities = async (location = "") => {
  const url = `${API_BASE}/api/locations${location ? `?location=${encodeURIComponent(location)}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};
