import express from "express";
import { getAllLocations, createLocation, updateLocation, deleteLocation } from "../controllers/location.controller.js";



const router = express.Router();

// get all locations or by ?city=Delhi
router.get("/", getAllLocations);

// add new location
router.post("/", createLocation);

// update location
router.put("/:id", updateLocation);

// delete location
router.delete("/:id", deleteLocation);       


export default router;