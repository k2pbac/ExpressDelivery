const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    dateIssued: {
        type: String,
        required: true,
        unique: false
    },
    dateCompleted: {
        type: String,
        required: true,
        unique: false
    },
    totalCost: {
        type: String,
        required: true,
        unique: false
    },
    products: [{
        type: String,
        required: false,
        unique: false
    }],
    driver: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    }
});



module.exports = mongoose.model("Transaction", transactionSchema);