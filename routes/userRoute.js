const express = require("express");
const {
  registerUser,
  loginUser,
  allUser,
  logOut,
  getUserDetails,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/update-profile").put(isAuthenticatedUser, updateProfile);
router.route("/user-details").get(isAuthenticatedUser, getUserDetails);
router.route("/allusers").get(allUser);

module.exports = router;
