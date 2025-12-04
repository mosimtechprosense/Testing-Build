import prisma from "../config/db.js";


// Function to get all locations
export const getAllLocationsDB = async (query = {}) => {
  // Normalize search terms
  const citySearch = query.city ? `%${query.city.replace(/-/g, " ")}%` : null;
  const locSearch = query.location ? `%${query.location.replace(/-/g, " ")}%` : null;

  // Raw SQL query
  const locations = await prisma.$queryRaw`
    SELECT l.*, c.id as city_id, c.name as city_name
    FROM location l
    JOIN city c ON l.cityId = c.id
    WHERE 1=1
    ${citySearch ? prisma.sql` AND LOWER(c.name) LIKE LOWER(${citySearch})` : prisma.sql``}
    ${locSearch ? prisma.sql` AND LOWER(l.name) LIKE LOWER(${locSearch})` : prisma.sql``}
  `;

  return locations;
};


// fucntion to create the locations if it does not exits    
export const createLocationDB = async ( name, cityName ) => {
    const city = await prisma.city.upsert({
        where: {name :cityName},
        update : {},
        create : {name: cityName}
    });

    return prisma.location.create({
        data: { name, cityId: city.id},
    });
};

// function to update the lcoations
export const updateLocationDB = async (id, name) => {
    return prisma.location.update({
        where: {id: Number(id)},
        data: { name },
    });
};


// function to delete the locations
export const deleteLocationDB = async (id) => {
    return prisma.location.delete({
        where: { id: Number(id) } 
    });
};