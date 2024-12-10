const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String, // هنا يمكن أن تكون روابط للصور
      },
    ],
    category: {
      type: String,
      required: true,
    },
    serviceCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter", // ربط المنتج بمركز الخدمة الذي يقدمه
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
