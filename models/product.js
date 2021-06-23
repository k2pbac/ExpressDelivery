const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false
    },
    image: {
        type: String,
        required: false,
        unique: false
    },
    description: [
        {
            type: String,
            required: false,
            unique: false
        }
    ],
    customizations: [
        {
            type: String,
            required: false,
            unique: false
        }
    ],
    combo: [
        {
            type: String,
            required: false,
        }
    ],
    review: {
        type: Number,
        required: false,
        unique: false,
        min: 1,
        max: 5
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);