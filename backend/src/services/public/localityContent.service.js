import prisma from "../../config/db.js"
import slugify from "slugify"
import slugToName from "../../utils/slugToName.js"

// CREATE
export const createLocalityContentDB = async (data) => {
const slug =
  data.slug ||
  slugify(data.name, { lower: true })


  return prisma.localityContent.create({
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
  return prisma.localityContent.findMany({
    orderBy: { created_at: "desc" }
  })
}

// READ BY ID
export const getLocalityContentByIdDB = async (id) => {
  return prisma.localityContent.findUnique({
    where: { id: BigInt(id) }
  })
}

// READ BY SLUG (Frontend SEO page)
export const getLocalityContentBySlugDB = async (slug) => {
  const name = slugToName(slug)

  return prisma.localities.findFirst({
    where: {
      name: {
        equals: name,      }
    }
  })
}


// UPDATE
export const updateLocalityContentDB = async (id, data) => {
  return prisma.localityContent.update({
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
  return prisma.localityContent.delete({
    where: { id: BigInt(id) }
  })
}
