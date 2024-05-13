const express = require("express");
const productRouter = express.Router();
const Product = require("../models/Product");
const Image = require("../models/Image");
const upload = require("../middleware/imageUpload");

productRouter.post("/image", upload.single("image"), (req, res) => {
    try {
        const image = new Image({
            originalFilename: req.file.originalname,
            key: req.file.filename,
        });
        res.status(200).send(req.file.filename);
    } catch (error) {
        console.error(error);
    }
});

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

productRouter.get("/", async (req, res) => {
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0; // skip = skip + limit
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "desc";
    const search = req.query.searchForm;

    let findArgs = {}; //continents:[]

    for (let key in req.query.filters) {
        if (req.query.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.query.filters[key][0],
                    $lte: req.query.filters[key][1],
                };
            } else {
                // if key === "continents"
                findArgs[key] = req.query.filters[key]; //key가 continent
            }
        }
    }

    console.log("findArgs", findArgs);
    console.log("search", search);

    if (search) {
        findArgs["$text"] = { $search: search };
    }

    try {
        const products = await Product.find(findArgs)
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);
        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;
        res.status(200).send({ products, hasMore });
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
