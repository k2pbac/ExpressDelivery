const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    year: {
        type: Number,
        required: true,
        unique: false,
        min: [2014, 'Vehicle needs to be 2014 or newer']
    },
    vehicleImage: {
        type: String,
        required: true,
        unique: true
    }
});

const driverSchema = new Schema({
    driverName: {
        type: String,
        required: true,
        unique: false
    },
    age: {
        type: String,
        required: true,
        unique: false
    },
    rating: {
        type: Number,
        required: false,
        unique: false,
        max: 5,
        min: 1
    },
    availability: {
        type: Boolean,
        required: true,
        unique: false
    },
    driverImage: {
        type: String,
        required: false,
        unique: false
    },
    vehicle: vehicleSchema
});


module.exports = mongoose.model("Driver", driverSchema);