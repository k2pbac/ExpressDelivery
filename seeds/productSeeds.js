const mongoose = require('mongoose');
const { store } = require('./productSeedHelpers');
const Store = require('../models/store');
const Product = require("../models/product");
const product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/ExpressDelivery', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Store.deleteMany({});
    await Product.deleteMany({});
    for (let i = 0; i < store.length; i++) {
        let el = store[i];
        let newStore = new Store({
            storeName: el.name,
            storeBrand: el.brand,
            availability: el.availability,
            hours: el.hours,
        });
        for (let product of el.products) {
            let newProduct = new Product({
                product: product.product,
                price: product.price,
                image: product.image,
                description: product.description,
                customizations: product.customizations,
                storeId: newStore._id,
            })
            // console.log(newProduct);
            await newProduct.save();
        };
        await newStore.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})