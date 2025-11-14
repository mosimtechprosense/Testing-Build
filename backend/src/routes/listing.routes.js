import { Router } from "express";
import { createListing, getAllListing, getListingById, updateListing, deleteListing, getRecommendedListings, getHighDemandListings } from "../controllers/listing.controller.js";



const router = Router();

//* Listing Routes

//Other Routes
router.get("/recommended", getRecommendedListings);
router.get("/high-demand", getHighDemandListings);


// CRUD
router.post("/", createListing);
router.get("/", getAllListing);
router.get("/:id", getListingById);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

export default router;

