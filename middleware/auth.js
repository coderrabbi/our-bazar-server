const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  // const { coToken } = req.cookies;
  // if (coToken) {
  //   const decodedData = jwt.verify(coToken, process.env.JWT_SECRET_KEY);
  //   req.user = await User.findById(decodedData._id);
  //   next();
  // } else {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Please Login to access this resource",
  //   });
  // }
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ messege: "unvalid token" });
  }
  const token = authHeader.split(" ")[1];
  if (token) {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Please Login to access this resource",
    });
  }
};
