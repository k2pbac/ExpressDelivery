const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const storeSchema = new Schema({
    storeName: {
        type: String,
        required: true,
        unique: false
    },
    storeBrand: {
        type: String,
        required: false,
        unique: true
    },
    availability: {
        type: Boolean,
        required: false,
        unique: false
    },
    hours: {
        type: String,
        required: false,
        unique: false,
    },
    storeReview: {
        type: Number,
        required: false,
        unique: false,
        min: 1,
        max: 5
    }
});


module.exports = mongoose.model("Store", storeSchema);