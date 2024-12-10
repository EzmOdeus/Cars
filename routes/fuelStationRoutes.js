const express = require("express");
const {
  createFuelStation,
  getFuelStations,
} = require("../controllers/fuelStationController");

const router = express.Router();

// إضافة محطة بنزين
router.post("/", createFuelStation);

// الحصول على جميع محطات البنزين
router.get("/", getFuelStations);

module.exports = router;
