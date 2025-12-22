import prisma from "../config/db.js"
import slugify from "slugify"

// venue images url builder fuction
const BASE_URL = process.env.BASE_URL || "http://localhost:5000"

const normalize = (value) => {
  if (!value) return undefined
  return value.replace(/-/g, " ").toLowerCase()
}

const buildImageURL = (image) => `${BASE_URL}/${image}`

const formatImages = (venue_images = []) => {
  return venue_images.map((img) => ({
    ...img,
    image_url: buildImageURL(img.image)
  }))
}

//todo: CREATE — Add new listing
export const createListingDB = async (data) => {
  const slug = slugify(data.title, { lower: true }) + "-" + Date.now()

  const excerpt = data.description
    ? data.description.slice(0, 150)
    : "No description available"

  const listing = await prisma.listings.create({
    data: {
      ...data,
      slug,
      excerpt
    },
    include: { venue_images: true }
  })

  return {
    ...listing,
    venue_images: formatImages(listing.venue_images)
  }
}

//* READ — Get all listings (with filters)
export const getAllListingDB = async (filters = {}, skip = 0, take = 999) => {
  const {
    city,
    locality,
    minGuests,
    maxGuests,
    minBudget,
    maxBudget,
    venueType,
    category,
    vegetarian,
    nonVegetarian,
    recommended,
    highDemand,
    search,
    sortBy = "created_at",
    order = "desc"
  } = filters

  const safeMinGuests = minGuests !== undefined ? Number(minGuests) : 0
  const safeMaxGuests = maxGuests !== undefined ? Number(maxGuests) : 100000

  // Normalize boolean filters from query params
  const recommendedBool = recommended === "true" || recommended === true
  const highDemandBool = highDemand === "true" || highDemand === true
  const normalizedCity = normalize(city)
  const normalizedLocality = normalize(locality)

  const where = {
    status: true,

    // Search across multiple fields
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { city: { contains: search } },
            { locality: { contains: search } },
            { description: { contains: search } }
          ]
        }
      : {}),

    // listing keywords
    ...(category
      ? {
          keywords: {
            contains: category,
            mode: "insensitive"
          }
        }
      : {}),

    // City / Locality filters
    ...(city ? { city: { equals: normalizedCity } } : {}),

    ...(locality
      ? {
          locality: {
            contains: String(normalizedLocality)
          }
        }
      : {}),

    // Guest range filters
    AND: [
      { max_guest: { gte: safeMinGuests } },
      { min_guest: { lte: safeMaxGuests } }
    ],

    // Budget range filters
    ...(minBudget || maxBudget
      ? {
          AND: [
            minBudget ? { max_budget: { gte: Number(minBudget) } } : {},
            maxBudget ? { min_budget: { lte: Number(maxBudget) } } : {}
          ].filter(Boolean)
        }
      : {}),

    // Venue Type (keywords or description)
    ...(venueType
      ? {
          OR: [
            { keywords: { contains: venueType, mode: "insensitive" } },
            { description: { contains: venueType, mode: "insensitive" } },
            { title: { contains: venueType, mode: "insensitive" } }
          ]
        }
      : {}),

    // Meal Type filters
    ...(vegetarian === "true" ? { features: { contains: "vegetarian" } } : {}),
    ...(nonVegetarian === "true"
      ? { features: { contains: "non-vegetarian" } }
      : {}),

    // Recommended / High demand
    ...(recommendedBool ? { recommended: true } : {}),
    ...(highDemandBool ? { high_demand: true } : {})
  }

  // Validate sortBy field to match Prisma columns
  const validSortFields = [
    "created_at",
    "min_budget",
    "max_budget",
    "vegPrice",
    "nonVegPrice",
    "guests",
    "recommended",
    "high_demand"
  ]

  // Use default if invalid
  const orderBy = validSortFields.includes(sortBy)
    ? { [sortBy]: order === "asc" ? "asc" : "desc" }
    : { created_at: "desc" }

  // Fetch paginated listings
  const listings = await prisma.listings.findMany({
    where,
    skip: Number(skip),
    take: Number(take),
    orderBy,
    include: {
      venue_images: true
    }
  })

  // Count total for pagination
  const totalCount = await prisma.listings.count({ where })

  const updatedListings = listings.map((listing) => ({
    ...listing,
    venue_images: listing.venue_images.map((img) => ({
      ...img,
      image_url: buildImageURL(img.image)
    }))
  }))

  return { listings: updatedListings, totalCount }
}

//* READ — Get single listing by ID
export const getListingByIdDB = async (id) => {
  const listing = await prisma.listings.findUnique({
    where: { id: BigInt(id) },
    include: { venue_images: true }
  })

  if (!listing) return null

  return {
    ...listing,
    venue_images: formatImages(listing.venue_images)
  }
}



//* READ — Get similar listing
export const getSimilarListingsDB = async (id) => {
  // ✅ Convert ONCE
  let listingId;
  try {
    listingId = BigInt(id);
  } catch {
    console.error("Invalid listing ID:", id);
    return [];
  }

  // ✅ Pass ORIGINAL id, not BigInt
  const currentListing = await getListingByIdDB(id);
  if (!currentListing) return [];

  const { listings } = await getAllListingDB(
    { city: currentListing.city },
    0,
    8
  );

  return listings.filter(
    (listing) => listing.id !== listingId
  );
};




//? UPDATE — Modify listing
export const updateListingDB = async (id, data) => {
  const listing = await prisma.listings.update({
    where: { id: BigInt(id) },
    data,
    include: { venue_images: true }
  })

  return {
    ...listing,
    venue_images: formatImages(listing.venue_images)
  }
}

//! DELETE — Soft delete (set status = false)
export const deleteListingDB = async (id) => {
  const listing = await prisma.listings.update({
    where: { id: BigInt(id) },
    data: { status: false },
    include: { venue_images: true }
  })

  return {
    ...listing,
    venue_images: formatImages(listing.venue_images)
  }
}

//* RECOMMENDED LISTINGS — For homepage section
export const getRecommendedListingsDB = async (limit, city) => {
  const filters = {
    recommended: true,
    status: true,
    ...(city ? { city } : {})
  }
  const { listings } = await getAllListingDB(filters, 0, limit)
  return listings
}

//* HIGH DEMAND LISTINGS — For homepage section
export const getHighDemandListingsDB = async (limit = 10, city) => {
  const filters = {
    highDemand: true,
    ...(city ? { city } : {})
  }
  const { listings } = await getAllListingDB(filters, 0, limit)
  return listings
}
