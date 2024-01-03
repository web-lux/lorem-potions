const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PotionSchema = new Schema({
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
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    number_in_stock: {
        type: Number,
        required: true,
        min: 0
    }
});

PotionSchema.virtual("url").get(function () {
    return `/potions/${this._id}`;
});

module.exports = mongoose.model("Potions", PotionSchema);