const Booking = require("../models/bookingModel");
const ServiceCenter = require("../models/serviceCenterModel");
const FuelStation = require("../models/fuelStationModel");
const Notification = require('../models/notificationModel');

// بعد إنشاء الحجز
// const notifications = async () => {
//     await new Notification({
//   user: booking.user,
//   type: 'booking',
//   message: `Your booking for ${service} on ${date} is confirmed.`,
// }).save();

// }
// notifications()
// إنشاء حجز جديد
const createBooking = async (req, res) => {
  const { user, serviceCenterId, fuelStationId, service, date, comments } =
    req.body;

  try {
    if (!serviceCenterId && !fuelStationId) {
      return res
        .status(400)
        .json({
          message: "Either serviceCenterId or fuelStationId is required.",
        });
    }

    const booking = new Booking({
      user,
      serviceCenter: serviceCenterId,
      fuelStation: fuelStationId,
      service,
      date,
      comments,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

const getGookingByid = async (req, res) => {
   const {id}=req.params
   console.log("🚀 ~ getGookingByid ~ id:", id)
   try {
     const bookings = await Booking.findById(id)
       .populate("user", "name email")
       .populate("serviceCenter", "name location")
       .populate("fuelStation", "name location");
     res.json(bookings);
   } catch (error) {
     res.status(500).json({ message: "Error fetching bookings", error });
   }
}
// الحصول على جميع الحجوزات
const getBookings = async (req, res) => {
 
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("serviceCenter", "name location")
      .populate("fuelStation", "name location");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// تحديث حالة الحجز
const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error });
  }
};

module.exports = {
  getGookingByid,
  createBooking,
  getBookings,
  updateBookingStatus,
};
