const Order = require("../models/order");
const Driver = require("../models/driver");
const Store = require("../models/store");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");
const moment = require("moment");
const mongoose = require("mongoose");


module.exports.reloadCart = (req, res) => {
    res.render("partials/cart");
}

module.exports.renderDeliveryForm = (req, res) => {
    res.render("services/delivery/index");
}

module.exports.processDeliveryForm = (req, res) => {
    res.redirect("/delivery/stores");
}

module.exports.renderStores = async (req, res) => {
    const stores = await Store.find({});

    res.render("services/delivery/stores", { stores });
}

module.exports.displayStore = async (req, res) => {

    try {
        const { id } = req.params;

        const store = await Store.findById(id);
        // if (mongoose.isValidObjectId(productId)) {
        const products = await Product.find({ storeId: store._id });
        // }
        res.render("services/delivery/store", { products, store });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/delivery/stores');
    }
}

module.exports.removeFromCart = async (req, res, next) => {
    const { productId } = req.params;

    var cart = await new Cart(req.session.cart);

    const product = await Product.findById(productId);
    cart.remove(product, product.id);


    req.session.cart = cart;

    console.log(req.session.cart, req.session.cart.totalQty);

    res.render("partials/cart", { qty: req.session.cart.totalQty });
}

module.exports.addToCart = async (req, res, next) => {
    const { productId, storeId } = req.params;
    const { quantity } = req.query;

    var store = await Store.findById(storeId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await Product.findById(productId);
    cart.add(product, parseInt(quantity), product.id, store.storeName);
    req.session.cart = cart;

    res.send({ cart: req.session.cart, totalQty: cart.totalQty, array: cart.generateArray(), store: req.session.cart.store });
};


module.exports.completeDeliveryOrder = (req, res) => {

}

module.exports.renderRideForm = (req, res) => {
    res.render("services/ride/index");
}

module.exports.processRideForm = async (req, res) => {
    const { pickup, destination } = req.body.service;
    req.session.pickup = pickup;
    req.session.destination = destination;
    req.session.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    await Driver.countDocuments().exec(async function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all users but only fetch one offset by our random #
        await Driver.findOne().skip(random).exec(
            function (err, driver) {
                // Tada! random user
                req.session.driver = driver;
                res.redirect("/ride/processOrder");
            })
    })

};


module.exports.renderRideOrderForm = (req, res) => {
    var pickup = req.session.pickup;
    var destination = req.session.destination;
    var driver = req.session.driver;
    var date = req.session.date;
    res.render("services/ride/rideProcess", { pickup, destination, driver, date });
};

module.exports.completeRideOrder = async (req, res) => {
    const transaction = await new Transaction({
        dateIssued: req.session.date,
        dateCompleted: req.session.date,
        totalCost: "19.99",
        driver: req.session.driver
    });

    await transaction.save();
    const order = await new Order({
        origin: req.session.pickup,
        destination: req.session.destination,
        userPayment: 123456789,
        transaction: transaction
    });
    await order.save();

    delete req.session.pickup, req.session.destination, req.session.driver, req.session.date;
    res.redirect("reviews");
}