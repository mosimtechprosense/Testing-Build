import { Router } from "express";
import { createListing, getAllListing, getListingById, updateListing, deleteListing, getRecommendedListings, getHighDemandListings, getSimilarListings } from "../controllers/listing.controller.js";
import { createListingSchema, filterListingSchema, idParamSchema } from "../validators/listing.validator.js";
import { validator } from "../middlewares/validator.js";



const router = Router();

//* Listing Routes

//Other Routes
router.get("/recommended", getRecommendedListings);
router.get("/high-demand", getHighDemandListings);


// CRUD
router.post("/", createListing);
router.get("/", getAllListing);
router.get("/:id/similar", getSimilarListings);
router.get("/:id", getListingById);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);




export default router;

