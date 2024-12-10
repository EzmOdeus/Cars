const express = require("express");
const {
  createPayment,
  updatePaymentStatus,
} = require("../controllers/paymentController");

const router = express.Router();

// إنشاء عملية دفع
router.post("/create", createPayment);

// تحديث حالة الدفع
router.post("/status", updatePaymentStatus);

module.exports = router;
