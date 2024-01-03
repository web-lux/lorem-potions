const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1800
    }
});

CategorySchema.virtual("url").get(function () {
    return `/categories/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);