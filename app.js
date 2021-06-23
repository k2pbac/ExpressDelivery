const express = require("express");
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require("path");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');

const genRoutes = require("./routes/general");
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/services');

const User = require("./models/user");
const Cart = require("./models/cart");
const MongoDbStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ExpressDelivery';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


const secret = process.env.SECRET || 'thisshouldbeabettersecret!';


const sessionConfig = {
    store: MongoDbStore.create({
        mongoUrl: dbUrl, secret,
        touchAfter: 24 * 60 * 60
    }),
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.session = req.session;
    if (typeof (req.session.cart) !== "undefined") {
        res.locals.cart = new Cart(req.session.cart);
    }
    next();
})

app.use("/", genRoutes);
app.use('/', userRoutes);
app.use('/', serviceRoutes)


app.get("/", (req, res) => {
    res.render("home");
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(port, (req, res) => {
    console.log("Serving on port", port);
})