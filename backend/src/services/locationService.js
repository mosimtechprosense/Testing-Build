import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// function to get the all loations
export const getAllLocationsDB = async ( city ) => {
    if (city) {
        return prisma.location.findMany({
             where: { city: { name: { equals: city } } },
             include : {city: true},
        })
    }
    return prisma.location.findMany({include : {city: true}});
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