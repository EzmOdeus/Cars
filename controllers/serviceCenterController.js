const ServiceCenter = require("../models/serviceCenterModel");

// إضافة مركز صيانة جديد
const createServiceCenter = async (req, res) => {
  const { name, lat, long, services, contact } = req.body;

  const location = {
    type: "Point",
    coordinates: [long, lat], // [longitude, latitude]
  };

  const serviceCenter = new ServiceCenter({
    name,
    location,
    services,
    contact,
  });

  try {
    const createdServiceCenter = await serviceCenter.save();
    res.status(201).json(createdServiceCenter);
  } catch (error) {
    res.status(500).json({ message: "Error creating service center" });
  }
};

// الحصول على قائمة من مراكز الصيانة
const getServiceCenters = async (req, res) => {
  try {
    const serviceCenters = await ServiceCenter.find()
    res.json(serviceCenters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service centers" });
  }
};

const getNearbyServiceCenters = async (req, res) => {
  const { lat, long } = req.query; // نأخذ lat و long من معلمات الاستعلام
  try {
    const serviceCenters = await ServiceCenter.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat], // [longitude, latitude]
          },
          $maxDistance: 50000, // يمكنك تحديد المسافة بأمتار
        },
      },
    });
    res.json(serviceCenters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nearby service centers" });
  }
};

module.exports = {
  createServiceCenter,
  getServiceCenters,
  getNearbyServiceCenters,
};
