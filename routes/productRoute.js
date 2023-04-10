const express = require("express");
// const { isAuthenticatedUser } = require("../middleware/auth");
const {
  allProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  userProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createOrder,
  userOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/allproducts").get(allProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id").delete(isAuthenticatedUser, deleteProduct);
router.route("/product").post(isAuthenticatedUser, createProduct);
router.route("/product").get(isAuthenticatedUser, userProduct);
router.route("/order").post(isAuthenticatedUser, createOrder);
router.route("/order").get(userOrder);
router.route("/order/:id").delete(isAuthenticatedUser, deleteOrder);

module.exports = router;
