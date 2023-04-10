const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
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
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
