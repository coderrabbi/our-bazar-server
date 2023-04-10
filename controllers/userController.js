const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const registerUser = async (req, res) => {
//   const { password, name, phoneNumber } = req.body;
//   console.log(password, name, phoneNumber);
//   let user = await User.findOne({ phoneNumber });
//   if (user) {
//     res.status(401).send({ message: "user already exists" });
//   } else {
//     const user = await User.create({
//       name,
//       password,
//       phoneNumber,
//     });
// const token = jwt.sign(
//   { _id: user._id, name: user.name },
//   process.env.JWT_SECRET_KEY
// );

//     return res.json({ token, user, message: "Register Successfull" });
//   }
// };

const registerUser = async (req, res) => {
  // Check if this user already exisits
  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    });
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );

    res.json({ token, user, message: "Register Successfull" });
  }
};

const loginUser = async (req, res) => {
  // find the user based on email
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber }).select("+password");
  if (!user) {
    return res.status(400).json({
      error: "User with that phone number does not exist. Please signup",
    });
  }
  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ error: "please enter phone number and password" });
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ error: "Invalid phone number or password" });
  }

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("coToken", token);
  return res.json({ token, user, message: "Login Successfull" });
};

const logOut = (req, res, next) => {
  res.cookie("token", "", {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    {
      console.log(error);
    }
  }
};

const updateProfile = async (req, res) => {
  console.log(req.body);
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    await user.remove();
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (err) {
    res.status(404).send(err);
  }
};

const userDelete = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json("user not found");
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "user Delete Successfully",
  });
};

const allUser = async (req, res) => {
  const query = {};
  const cursor = await User.find(query);
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send("faild to find data");
  }
};

module.exports = {
  loginUser,
  registerUser,
  allUser,
  getUserDetails,
  updateProfile,
  logOut,
  deleteUser,
  userDelete,
};
