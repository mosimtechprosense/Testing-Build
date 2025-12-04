import prisma from "../config/db.js";
import { Prisma } from "@prisma/client";


// Function to get all locations
export const getAllLocationsDB = async (query = {}) => {
  const locations = await prisma.$queryRaw(Prisma.sql`
    SELECT l.*, c.id as city_id, c.name as city_name
    FROM location l
    JOIN city c ON l.cityId = c.id
    ${query.city ? Prisma.sql`WHERE LOWER(l.name) LIKE LOWER(${`%${query.city.replace(/-/g, " ")}%`})` : Prisma.sql``}
  `);

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