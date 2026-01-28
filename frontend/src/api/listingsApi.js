import axiosInstance from "../utils/axiosInstance.js";
import { categoryToSlug } from "../utils/slugMaps";

let listingsController;

export const fetchListings = async (filters = {}) => {
  if (listingsController) listingsController.abort();
  listingsController = new AbortController();

  const { category, city, locality, minGuests, maxGuests, skip = 0, take = 10 } = filters;

  // Determine service slug dynamically
  const serviceSlug = category ? categoryToSlug[category] : "banquet-hall";

  // Determine location: locality > city > fallback
  const place = locality || city || "delhi";

  const params = {
    minGuests,
    maxGuests,
    skip,
    take
  };

  // Additional filters (mealType etc.)
  if (filters.mealType) params.mealType = filters.mealType;

  // Axios request with AbortController
  const source = axiosInstance.CancelToken.source();
  listingsController.signal.addEventListener("abort", () => {
    source.cancel("Request aborted");
  });

  const res = await axiosInstance.get(`/api/listings/${serviceSlug}/${place}`, {
    params,
    cancelToken: source.token
  });

  return res.data;
};

export const fetchListingById = async (id) => {
  if (!id) throw new Error("Listing ID is required");
  const res = await axiosInstance.get(`/api/listings/${id}`);
  return res.data;
};

export const fetchSimilarListings = async (id) => {
  if (!id) throw new Error("Listing ID is required");
  const res = await axiosInstance.get(`/api/listings/${id}/similar`);
  return res.data;
};

export const fetchHallsByListingId = async (id) => {
  if (!id) throw new Error("Listing ID is required");
  const res = await axiosInstance.get(`/api/listings/${id}`);
  return res.data;
};

export const fetchLocalities = async (location = "") => {
  const res = await axiosInstance.get("/api/locations", {
    params: location ? { location } : {}
  });
  return res.data;
};

export const fetchLocalityDescription = async (slug) => {
  if (!slug) throw new Error("Locality slug is required");
  const res = await axiosInstance.get(`/api/localities/seo/locality/${slug}`);
  return res.data;
};
