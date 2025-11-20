import prisma from "../config/db.js";
import slugify from "slugify";


//todo: CREATE — Add new listing
export const createListingDB = async (data) => {
  const slug = slugify(data.title, { lower: true }) + "-" + Date.now();

  const excerpt = data.description 
    ? data.description.slice(0, 150) 
    : "No description available";

  return await prisma.listings.create({
    data: {
      ...data,
      slug,
      excerpt
    },
    include: { venue_images: true },
  });
};


//* READ — Get all listings (with filters)
export const getAllListingDB = async (filters = {}, skip = 0, take = 20) => {
  const {
    city,
    locality,
    minGuests,
    maxGuests,
    minBudget,
    maxBudget,
    venueType,
    vegetarian,
    nonVegetarian,
    recommended,
    highDemand,
    search,
    sortBy = "created_at",
    order = "desc",
  } = filters;

  // Normalize boolean filters from query params
  const recommendedBool = recommended === "true" || recommended === true;
  const highDemandBool = highDemand === "true" || highDemand === true;

  const where = {
    status: true,


  // Search across multiple fields
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { city: { contains: search } },
            { locality: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {}),


    // City / Locality filters
    ...(city ? { city: { equals: city } } : {}),
    ...(locality ? { locality: { equals: locality } } : {}),


    // Guest range filters
    ...(minGuests && maxGuests
      
      ? {
          AND: [
            { min_guest: { gte: Number(minGuests) } },
            { max_guest: { lte: Number(maxGuests) } },
          ],
        }
      : {}),


    // Budget range filters
    ...(minBudget && maxBudget
      ? {
          AND: [
            { min_budget: { gte: Number(minBudget) } },
            { max_budget: { lte: Number(maxBudget) } },
          ],
        }
      : {}),


    // Venue Type (keywords or description)
    ...(venueType
      ? {
          OR: [
            { keywords: { contains: venueType } },
            { description: { contains: venueType } },
          ],
        }
      : {}),


    // Meal Type filters
    ...(vegetarian === "true"
      ? { features: { contains: "vegetarian" } }
      : {}),
    ...(nonVegetarian === "true"
      ? { features: { contains: "non-vegetarian" } }
      : {}),


    // Recommended / High demand
    ...(recommendedBool ? { recommended: true } : {}),
    ...(highDemandBool ? { high_demand: true } : {}),
  };


  // Fetch paginated listings
  const listings = await prisma.listings.findMany({
    where,
    skip: Number(skip),
    take: Number(take),
    orderBy: { [sortBy]: order },
    include: {
    venue_images: true,  
    },
  });


  // Count total for pagination
  const totalCount = await prisma.listings.count({ where });

  return { listings, totalCount };
};


//* READ — Get single listing by ID
export const getListingByIdDB = async (id) => {
  return await prisma.listings.findUnique({
    where: { id: BigInt(id) },
    include: {
      venue_images: true,   
    }
  });
};



//? UPDATE — Modify listing
export const updateListingDB = async (id, data) => {
  return await prisma.listings.update({
    where: { id: BigInt(id) },
    data,
    include: {
    venue_images: true, 
  },
  });
};



//! DELETE — Soft delete (set status = false)
export const deleteListingDB = async (id) => {
  return await prisma.listings.update({
    where: { id: BigInt(id) },
    data: { status: false },
    include: { venue_images: true },
  });
};



//* RECOMMENDED LISTINGS — For homepage section
export const getRecommendedListingsDB = async (limit = 10, city) => {
  const filters = {
    recommended: true,
    status: true,
    ...(city ? { city } : {}),
  };
  const { listings } = await getAllListingDB(filters, 0, limit);
  return listings;
};



//* HIGH DEMAND LISTINGS — For homepage section
export const getHighDemandListingsDB = async (limit = 10, city) => {
  const filters = {
    highDemand: true,
    ...(city ? { city } : {}),
  };
  const { listings } = await getAllListingDB(filters, 0, limit);
  return listings;
};