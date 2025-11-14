import express from "express";
import listingRoutes from "./listing.routes.js"
import locationRoutes from "./location.routes.js"


const router = express.Router();


// All API routes
router.use("/listings", listingRoutes);
router.use("/locations", locationRoutes);


export default router;