const express = require("express");
const {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

// إنشاء إشعار جديد
router.post("/", createNotification);

// الحصول على إشعارات المستخدم
router.get("/:userId", getUserNotifications);

// تحديث حالة الإشعار
router.patch("/:notificationId", markNotificationAsRead);

module.exports = router;
