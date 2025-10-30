import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// Get all locations (optionally by city)
export const getLocations = async (req, res) => {
  try {
    const { city } = req.query
    let locations

    if (city) {
      locations = await prisma.location.findMany({
        where: { city: { name: { equals: city, mode: "insensitive" } } },
        include: { city: true }
      })
    } else {
      locations = await prisma.location.findMany({ include: { city: true } })
    }

    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
