import api from "../utils/axiosInstance";

export const getAllListings = () => api.get("/listings");

export const getListingById = (id) =>
  api.get(`/listings/${id}`);

export const getFilteredListings = (params) =>
  api.get("/listings", { params });
