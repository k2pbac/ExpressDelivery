const User = require("../models/user");

module.exports.renderAccountForm = (req, res) => {
    res.render("users/account");
};

module.exports.renderReviews = (req, res) => {
    res.render("users/reviews");
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.userLogin = (req, res) => {
    req.flash("success", `Welcome back ${req.user.username[0].toUpperCase() + req.user.username.slice(1)}!`);
    const redirectUrl = req.session.returnTo || "/home";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.renderRegisterForm = (req, res) => {
    res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next();
        });
        // req.flash("success", "Welcome to Photo Central!");
        res.redirect("/home");
    } catch (e) {
        // req.flash('error', e.message);
        console.log(e);
        res.redirect('/register');
    }
};

module.exports.userLogout = (req, res) => {
    req.logout();
    delete res.locals.user;
    req.flash("success", "Logged you out!");
    res.redirect("/home");
};


