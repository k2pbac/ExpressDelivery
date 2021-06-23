const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    nameOnCard: {
        type: String,
        required: true,
        unique: false
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: false
    },
    cvvNumber: {
        type: Number,
        required: true,
        unique: false
    },
    expiryDate: {
        type: String,
        required: true,
        unique: false
    },
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    payment: {
        type: [paymentSchema],
        required: false,
        unique: false
    },
    address: {
        type: String,
        required: false,
        unique: false
    }
});



userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);