import prisma from "../config/db.js"
import slugify from "slugify"

// CREATE
export const createLocalityContentDB = async (data) => {
  const slug =
    data.slug ||
    slugify(
      `banquet-hall-in-${data.city_name}-${data.name}`,
      { lower: true }
    )

  return prisma.locality_content.create({
    data: {
      name: data.name,
      title: data.title,
      heading: data.heading,
      description: data.description,
      meta_description: data.meta_description,
      keywords: data.keywords,
      city_id: BigInt(data.city_id),
      location_id: data.location_id ? BigInt(data.location_id) : null,
      slug
    }
  })
}

// READ ALL (Admin / future CMS)
export const getAllLocalityContentDB = async () => {
  return prisma.locality_content.findMany({
    orderBy: { created_at: "desc" }
  })
}

// READ BY ID
export const getLocalityContentByIdDB = async (id) => {
  return prisma.locality_content.findUnique({
    where: { id: BigInt(id) }
  })
}

// READ BY SLUG (Frontend SEO page)
export const getLocalityContentBySlugDB = async (slug) => {
  return prisma.locality_content.findUnique({
    where: { slug }
  })
}

// UPDATE
export const updateLocalityContentDB = async (id, data) => {
  return prisma.locality_content.update({
    where: { id: BigInt(id) },
    data: {
      title: data.title,
      heading: data.heading,
      description: data.description,
      meta_description: data.meta_description,
      keywords: data.keywords
    }
  })
}

// DELETE
export const deleteLocalityContentDB = async (id) => {
  return prisma.locality_content.delete({
    where: { id: BigInt(id) }
  })
}
