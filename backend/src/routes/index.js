import express from "express";
import listingRoutes from "./listing.routes.js"
import locationRoutes from "./location.routes.js"
import localityContentRoutes from "./localityContent.routes.js";
import contactRoutes from "./contact.routes.js"


const router = express.Router();


// All API routes
router.use("/listings", listingRoutes);
router.use("/locations", locationRoutes);
router.use("/localities", localityContentRoutes);
router.use("/contact", contactRoutes);


export default router;