const FuelStation = require("../models/fuelStationModel");

// إضافة محطة بنزين جديدة
const createFuelStation = async (req, res) => {
  const { name, lat, long, services, contact } = req.body;

  const location = {
    type: "Point",
    coordinates: [long, lat], // [longitude, latitude]
  };

  const fuelStation = new FuelStation({ name, location, services, contact });

  try {
    const createdFuelStation = await fuelStation.save();
    res.status(201).json(createdFuelStation);
  } catch (error) {
    res.status(500).json({ message: "Error creating fuel station" });
  }
};

// الحصول على قائمة من محطات البنزين
const getFuelStations = async (req, res) => {
  try {
    const fuelStations = await FuelStation.find();
    res.json(fuelStations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fuel stations" });
  }
};

module.exports = { createFuelStation, getFuelStations };
