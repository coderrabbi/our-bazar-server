const { Product } = require("../models/productModel");

const createProduct = async (req, res) => {
  const { title, price, email, category, description, image } = req.body;

  const product = await Product.create({
    title,
    price,
    category,
    description,
    image,
    email,
  });

  return res.json({ product, message: "Product Added Successfully" });
};

const allProducts = async (req, res) => {
  const query = {};
  const cursor = await Product.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({
      error: "Product Not Found",
    });
  }
  return res.json({ product, message: "product geted" });
};
const userProduct = async (req, res) => {
  const product = await Product.find({ email: req.query.email });
  if (!product) {
    return res.status(400).json({
      error: "Product Not Found",
    });
  }
  return res.json({ product, message: "product geted" });
};
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};
module.exports = {
  allProducts,
  getSingleProduct,
  deleteProduct,
  userProduct,
  createProduct,
};
