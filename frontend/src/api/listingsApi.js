import axiosInstance from "../utils/axiosInstance.js"; // <-- new import
let listingsController;

export const fetchListings = async (filters = {}) => {
  if (listingsController) {
    listingsController.abort();
  }

  listingsController = new AbortController();

  // Clean filters for axios
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (["minBudget", "maxBudget", "skip", "take", "vegetarian", "nonVegetarian"].includes(key) && isNaN(Number(value))) return false;
      return true;
    })
  );

  // For locality, replace dashes with spaces
  if (cleanedFilters.locality) {
    cleanedFilters.locality = String(cleanedFilters.locality).replace(/-/g, " ");
  }

  // Attach signal for cancellation
  const res = await axiosInstance.get("/api/listings", {
    params: cleanedFilters,
    signal: listingsController.signal,
  });

  return res.data;
};

export const fetchListingById = async (id) => {
  if (!id) throw new Error("Listing ID is required");

  const res = await axiosInstance.get(`/api/listings/${id}`);
  return res.data;
};

export const fetchSimilarListings = async (id) => {
  if (!id) throw new Error("Listing ID is required for similar listings");

  const res = await axiosInstance.get(`/api/listings/${id}/similar`);
  return res.data; // returns { success, count, data: [...] }
};

export const fetchHallsByListingId = async (id) => {
  const res = await axiosInstance.get(`/api/listings/${id}`);
  return res.data;
};

export const fetchLocalities = async (location = "") => {
  const res = await axiosInstance.get("/api/locations", {
    params: location ? { location } : {},
  });
  return res.data;
};

export const fetchLocalityDescription = async (slug) => {
  const res = await axiosInstance.get(`/api/localities/seo/locality/${slug}`);
  return res.data;
};
