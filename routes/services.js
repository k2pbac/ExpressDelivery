const express = require("express");
const router = express.Router();


const serviceController = require("../controllers/services");

// const {isLoggedIn} = require("../middleware");


router.route("/delivery")
    .get(serviceController.renderDeliveryForm)
    .post(serviceController.processDeliveryForm);

router.route("/delivery/stores")
    .get(serviceController.renderStores)
    .post(serviceController.completeDeliveryOrder);

router.route("/delivery/stores/:id")
    .get(serviceController.displayStore);

router.route("/delivery/stores/:storeId/addToCart/:productId")
    .get(serviceController.addToCart);

router.route("/delivery/stores/:storeId/removeFromCart/:productId")
    .get(serviceController.removeFromCart);


router.route("/ride")
    .get(serviceController.renderRideForm)
    .post(serviceController.processRideForm);


router.route("/ride/processOrder")
    .get(serviceController.renderRideOrderForm)
    .post(serviceController.completeRideOrder);

router.route("/reloadCart")
    .get(serviceController.reloadCart);

module.exports = router;

