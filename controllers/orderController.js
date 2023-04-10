const { Order } = require("../models/orderModel");

const createOrder = async (req, res) => {
  const { title, price, email, category, description, image } = req.body;

  const order = await Order.create({
    title,
    price,
    category,
    description,
    image,
    email,
  });

  return res.json({ order, message: "Product Added Successfully" });
};

const userOrder = async (req, res) => {
  const order = await Order.find({ email: req.query.email });
  if (!order) {
    return res.status(400).json({
      error: "order Not Found",
    });
  }
  return res.json({ order, message: "order geted" });
};
const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order Delete Successfully",
  });
};

module.exports = { createOrder, deleteOrder, userOrder };
