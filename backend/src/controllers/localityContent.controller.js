import {
  createLocalityContentDB,
  getAllLocalityContentDB,
  getLocalityContentByIdDB,
  getLocalityContentBySlugDB,
  updateLocalityContentDB,
  deleteLocalityContentDB
} from "../services/localityContent.service.js"

// CREATE
export const createLocalityContent = async (req, res) => {
  try {
    const data = await createLocalityContentDB(req.body)
    res.status(201).json({ success: true, data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Create failed" })
  }
}

// READ ALL
export const getAllLocalityContent = async (req, res) => {
  const data = await getAllLocalityContentDB()
  res.json({ success: true, data })
}

// READ BY ID
export const getLocalityContentById = async (req, res) => {
  const data = await getLocalityContentByIdDB(req.params.id)
  if (!data)
    return res.status(404).json({ message: "Not found" })

  res.json({ success: true, data })
}

// READ BY SLUG (SEO)
export const getLocalityContentBySlug = async (req, res) => {
  const data = await getLocalityContentBySlugDB(req.params.slug)

  if (!data)
    return res.status(404).json({ message: "SEO content not found" })

  res.json({ success: true, data })
}

// UPDATE
export const updateLocalityContent = async (req, res) => {
  const data = await updateLocalityContentDB(
    req.params.id,
    req.body
  )

  res.json({ success: true, data })
}

// DELETE
export const deleteLocalityContent = async (req, res) => {
  await deleteLocalityContentDB(req.params.id)
  res.json({ success: true, message: "Deleted successfully" })
}
