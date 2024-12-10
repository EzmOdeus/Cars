// const Notification = require('../models/notificationModel');
const sendEmail = require('../utils/emailSender');
const Notification = require("../models/notificationModel");

// إنشاء إشعار جديد
// const createNotification = async (req, res) => {
//   const { user, type, message } = req.body;

//   try {
//     const notification = new Notification({ user, type, message });
//     const savedNotification = await notification.save();

//     res.status(201).json(savedNotification);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating notification", error });
//   }
// };

// الحصول على إشعارات المستخدم
const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// تحديث حالة الإشعار (مقروء/غير مقروء)
const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

// إنشاء إشعار جديد مع البريد الإلكتروني
const createNotification = async (req, res) => {
  const { user, type, message, email } = req.body;

  try {
    const notification = new Notification({ user, type, message });
    const savedNotification = await notification.save();

    // إرسال بريد إلكتروني
    if (email) {
      await sendEmail({
        to: email,
        subject: `New Notification - ${type}`,
        text: message,
        html: `<p>${message}</p>`,
      });
    }

    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

module.exports = { createNotification, getUserNotifications, markNotificationAsRead };

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
};
