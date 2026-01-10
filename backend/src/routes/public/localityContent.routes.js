import express from "express"
import {
  createLocalityContent,
  getAllLocalityContent,
  getLocalityContentById,
  updateLocalityContent,
  deleteLocalityContent,
  getLocalitySeoBySlug,
} from "../../controllers/public/localityContent.controller.js"

const router = express.Router()

// Admin CRUD
router.post("/locality-content", createLocalityContent)
router.get("/locality-content", getAllLocalityContent)
router.get("/locality-content/:id", getLocalityContentById)
router.put("/locality-content/:id", updateLocalityContent)
router.delete("/locality-content/:id", deleteLocalityContent)
router.get("/seo/locality/:slug", getLocalitySeoBySlug)





export default router