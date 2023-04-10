const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  email: { type: String },
  image: {
    type: String,
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
