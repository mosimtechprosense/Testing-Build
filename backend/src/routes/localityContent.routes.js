import express from "express"
import {
  createLocalityContent,
  getAllLocalityContent,
  getLocalityContentById,
  getLocalityContentBySlug,
  updateLocalityContent,
  deleteLocalityContent
} from "../controllers/localityContent.controller.js"

const router = express.Router()

// Admin CRUD
router.post("/locality-content", createLocalityContent)
router.get("/locality-content", getAllLocalityContent)
router.get("/locality-content/:id", getLocalityContentById)
router.put("/locality-content/:id", updateLocalityContent)
router.delete("/locality-content/:id", deleteLocalityContent)

// Frontend SEO
router.get(
  "/seo/locality/:slug",
  getLocalityContentBySlug
)

export default router