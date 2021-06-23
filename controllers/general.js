
module.exports.renderHome = (req, res) => {
    res.render("home");
};

module.exports.renderAbout = (req, res) => {
    res.render("about");
};

module.exports.renderContact = (req, res) => {
    res.render("contact");
};

module.exports.renderCheckout = (req, res) => {
    res.render("checkout");
}