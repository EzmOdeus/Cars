const express = require("express");
const {
  createServiceCenter,
  getServiceCenters,
  getNearbyServiceCenters,
} = require("../controllers/serviceCenterController");

const router = express.Router();

// إضافة مركز صيانة
router.post("/", createServiceCenter);

// الحصول على جميع مراكز الصيانة
router.get("/", getServiceCenters);
router.get("/nearby", getNearbyServiceCenters);

module.exports = router;
