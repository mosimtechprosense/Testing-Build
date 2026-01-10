import express from "express";
import listingRoutes from "./public/listing.routes.js"
import locationRoutes from "./public/location.routes.js"
import localityContentRoutes from "./public/localityContent.routes.js";
import contactRoutes from "./public/contact.routes.js"
import adminAuthRoutes from "./admin/auth.routes.js";
import adminUserRoutes from "./admin/user.routes.js";


const router = express.Router();


// public routes
router.use("/listings", listingRoutes);
router.use("/locations", locationRoutes);
router.use("/localities", localityContentRoutes);
router.use("/contact", contactRoutes);


// admin routes
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/users", adminUserRoutes);

export default router;