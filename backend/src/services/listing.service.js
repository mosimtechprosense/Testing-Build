import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


//*  CREATE — Add new listing

export const createListingDB = async (data) => {
  return await prisma.listing.create({ data });
};

/**
 * READ — Get all listings (with filters)
 */
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

  const where = {
    status: true,

    // 🔍 Search across multiple fields
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { locality: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),

    //  City / Locality filters
    ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
    ...(locality ? { locality: { contains: locality, mode: "insensitive" } } : {}),

    // 👥 Guest range filters
    ...(minGuests && maxGuests
      ? {
          AND: [
            { min_guest: { gte: Number(minGuests) } },
            { max_guest: { lte: Number(maxGuests) } },
          ],
        }
      : {}),

    //  Budget range filters
    ...(minBudget && maxBudget
      ? {
          AND: [
            { min_budget: { gte: Number(minBudget) } },
            { max_budget: { lte: Number(maxBudget) } },
          ],
        }
      : {}),

    //  Venue Type (keywords or description)
    ...(venueType
      ? {
          OR: [
            { keywords: { contains: venueType, mode: "insensitive" } },
            { description: { contains: venueType, mode: "insensitive" } },
          ],
        }
      : {}),

    //  Meal Type filters
    ...(vegetarian === "true"
      ? { features: { contains: "vegetarian", mode: "insensitive" } }
      : {}),
    ...(nonVegetarian === "true"
      ? { features: { contains: "non-vegetarian", mode: "insensitive" } }
      : {}),

    //  Recommended / High demand
    ...(recommended === "true" ? { recomended: true } : {}),
    ...(highDemand === "true" ? { high_demand: true } : {}),
  };

  //  Fetch paginated listings
  const listings = await prisma.listing.findMany({
    where,
    skip: Number(skip),
    take: Number(take),
    orderBy: { [sortBy]: order },
  });

  //  Count total for pagination
  const totalCount = await prisma.listing.count({ where });

  return { listings, totalCount };
};

/**
 *  READ — Get single listing by ID
 */
export const getListingByIdDB = async (id) => {
  return await prisma.listing.findUnique({
    where: { id: Number(id) },
  });
};

/**
 *  UPDATE — Modify listing
 */
export const updateListingDB = async (id, data) => {
  return await prisma.listing.update({
    where: { id: Number(id) },
    data,
  });
};

/**
 *  DELETE — Soft delete (set status = false)
 */
export const deleteListingDB = async (id) => {
  return await prisma.listing.update({
    where: { id: Number(id) },
    data: { status: false },
  });
};

/**
 * 🌟 RECOMMENDED LISTINGS — For homepage section
 */
export const getRecommendedListingsDB = async (limit = 10, city) => {
  const filters = {
    recommended: "true",
    ...(city ? { city } : {}),
  };
  const { listings } = await getAllListingDB(filters, 0, limit);
  return listings;
};

/**
 *  HIGH DEMAND LISTINGS — For homepage section
 */
export const getHighDemandListingsDB = async (limit = 10, city) => {
  const filters = {
    highDemand: "true",
    ...(city ? { city } : {}),
  };
  const { listings } = await getAllListingDB(filters, 0, limit);
  return listings;
};
