const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const productRouter = require("./routers/productRouter");

app.use(cors());

dotenv.config();

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connencted");

    mongoose.set("debug", true);
    app.use(express.json());
    app.use("/products", productRouter);

    app.listen(4000);
  } catch (error) {
    console.log("db connect failure");
  }
};

server();
