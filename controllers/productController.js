const Product = require("../models/productModel");

const CreateProduct = async (req, res) => {
    const type = typeof(req.body)
    console.log("🚀 ~ CreateProduct ~ type:", type)
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateProduct,
    GetProductById,
  GetAllProducts
};