const mongoose = require('mongoose');
// const cities = require('./cities');
const { firstName, lastName, driverImages, cars } = require('./driverSeedHelpers');
const Driver = require('../models/driver');

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
    await Driver.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let randomAge = Math.floor(Math.random() * (60 - 21 + 1) + 21);
        let randomYear = Math.floor(Math.random() * (2021 - 2014 + 1) + 2014);
        let car = sample(cars);
        let driver = new Driver({
            driverName: sample(firstName) + " " + sample(lastName),
            age: randomAge,
            availability: true,
            driverImage: sample(driverImages),
            vehicle: {
                name: car.name,
                year: randomYear,
                vehicleImage: car.image
            }
        })
        await driver.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})