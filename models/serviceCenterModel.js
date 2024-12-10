const mongoose = require("mongoose");

const serviceCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String, // يجب أن يكون "Point" لتحديد الموقع الجغرافي
        enum: ["Point"], // تأكد من أن نوع الموقع هو "Point"
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    services: [
      {
        type: String,
      },
    ],
    contact: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// استخدام التعداد الجغرافي للموقع
serviceCenterSchema.index({ location: "2dsphere" });

const ServiceCenter = mongoose.model("ServiceCenter", serviceCenterSchema);

module.exports = ServiceCenter;
