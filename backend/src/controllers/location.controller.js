import { getAllLocationsDB, createLocationDB, updateLocationDB, deleteLocationDB } from "../services/location.service.js";



export const getAllLocations = async ( req, res) => {
  try {
    const { city } = req.query
    const locations = await getAllLocationsDB(city);
    res.json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createLocation = async ( req, res) => {
  try {
    const { name, cityName } = req.body;
    const newLoc = await createLocationDB(name, cityName);
    res.json(
      { newLoc ,
        success: true,
        message: "Location added successfully"
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLocation = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await updateLocationDB(id, name);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteLocation = async ( req, res ) => {
  try {
    const { id } = req.params;
    await deleteLocationDB(id);
    res.json({ message: "Location deleted successfully "});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};