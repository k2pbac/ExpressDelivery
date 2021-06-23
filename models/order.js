const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    origin: {
        type: String,
        required: true,
        unique: false
    },
    destination: {
        type: String,
        required: true,
        unique: false
    },
    userPayment: {
        type: Number,
        required: true,
        unique: false
        // type: Schema.Types.ObjectId,
        // ref: "User"
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }

});


module.exports = mongoose.model("Order", orderSchema);