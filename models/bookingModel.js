const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter",
    },
    fuelStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FuelStation",
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    payment: {
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      amount: {
        type: Number,
        required: false,
      },
      paymentIntentId: {
        type: String,
        required: false,
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
