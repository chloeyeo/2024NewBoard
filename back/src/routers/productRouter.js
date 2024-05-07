const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");

productRouter.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({ product });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error });
  }
});

productRouter.get("/", async (_, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.status(200).send({ products });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error });
  }
});

productRouter.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).send({ product });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error });
  }
});

module.exports = productRouter;
