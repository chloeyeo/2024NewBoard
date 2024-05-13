const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    key: { type: String },
    originalFilename: { type: String },
});
const image = model("image", imageSchema);

module.exports = image;
