// src/api/adminApi.js
import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE + "/api/admin",
});


// Attach JWT
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;  
});

/* ================= AUTH ================= */

export const requestLoginOTP = (email) =>
  adminApi.post("/auth/login", { email });

export const verifyLoginOTP = (email, otp) =>
  adminApi.post("/auth/verify-otp", { email, otp });

export const requestPasswordReset = (email) =>
  adminApi.post("/auth/password-reset/request", { email });

export const resetPassword = (data) =>
  adminApi.post("/auth/password-reset/verify", data);

export const loginWithPassword = (email, password) =>
  adminApi.post("/auth/login-password", { email, password });


/* ================= DASHBOARD ================= */

export const getDashboardStats = () =>
  adminApi.get("/dashboard/stats");

export const getRecentLeads = () =>
  adminApi.get("/leads/recent");

export const getRecentBookings = () =>
  adminApi.get("/bookings/recent");

/* ================= USERS ================= */

export const getUsers = () =>
  adminApi.get("/users");

export const createUser = (data) =>
  adminApi.post("/users", data);

export const updateUser = (id, data) =>
  adminApi.put(`/users/${id}`, data);

export const deleteUser = (id) =>
  adminApi.delete(`/users/${id}`);

/* ================= LISTINGS ================= */

export const getListings = (params) =>
  adminApi.get("/listings", { params });

export const updateListing = (id, data) =>
  adminApi.put(`/listings/${id}`, data);

/* ================= LEADS ================= */

export const getLeads = (params) =>
  adminApi.get("/leads", { params });

/* ================= LOCATIONS ================= */

export const getLocations = () =>
  adminApi.get("/locations");

export default adminApi;


