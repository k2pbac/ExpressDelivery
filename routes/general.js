const express = require("express");
const router = express.Router();

const generalController = require("../controllers/general");

router.route("/home")
    .get(generalController.renderHome);

router.route("/about")
    .get(generalController.renderAbout);

router.route("/contact")
    .get(generalController.renderContact);

router.route("/checkout")
    .get(generalController.renderCheckout);

module.exports = router;