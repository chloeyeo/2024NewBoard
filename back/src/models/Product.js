const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        maxLength: 30,
    },
    description: String,
    price: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        default: [],
    },
    sold: {
        type: Number,
        default: 0,
    },
    continents: {
        type: Number,
        default: 1,
    },
    views: {
        type: Number,
        default: 0,
    },
});
productSchema.index(
    {
        title: "text",
        description: "text",
    },
    {
        weights: {
            title: 5,
            description: 1,
        },
    }
);
const Product = model("product", productSchema);

module.exports = Product;
