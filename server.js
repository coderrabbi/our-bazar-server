const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const corsOptions = require("./config/corsOption");
// middleware

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// connect DB

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("db connected"))
  .catch(console.error);

app.use("/api/", userRoute);
app.use("/api/", productRoute);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
