import axiosInstance from "../utils/axiosInstance.js";

export const fetchListings = async (filters = {}) => {
  const res = await axiosInstance.get("/api/listings", { params: filters });
  return res.data;
};

export const fetchListingById = async (id) => {
  const res = await axiosInstance.get(`/api/listings/${id}`);
  return res.data;
};

export const fetchSimilarListings = async (id) => {
  const res = await axiosInstance.get(`/api/listings/${id}/similar`);
  return res.data;
};

export const fetchLocalities = async (location = "") => {
  const res = await axiosInstance.get("/api/locations", {
    params: location ? { location } : {}
  });
  return res.data;
};

export const fetchLocalityDescription = async (slug) => {
  const res = await axiosInstance.get(`/api/localities/seo/locality/${slug}`);
  return res.data;
};
