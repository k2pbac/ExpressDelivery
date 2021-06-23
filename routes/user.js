const express = require("express");
const router = express.Router();
const passport = require("passport");


const userController = require("../controllers/user");


router.route("/account")
    .get(userController.renderAccountForm);

router.route("/reviews")
    .get(userController.renderReviews);

router.route("/login")
    .get(userController.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.userLogin);

router.route("/register")
    .get(userController.renderRegisterForm)
    .post(userController.registerUser);

router.route("/logout")
    .get(userController.userLogout);

module.exports = router;