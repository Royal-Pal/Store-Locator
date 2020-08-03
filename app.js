// Load env variables
require("dotenv").config({path: "./config/config.env"});

var express = require("express"),
    mongoose = require("mongoose");

var app = express();

// Connecting with DB
mongoose.connect("mongodb://localhost/store_locator",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // Replacement of body-parser
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
    res.locals.apiKey = process.env.GEOCODER_API_KEY;
    next();
});

app.set("view engine", "ejs");

// geocoder.geocode('25 BN BSF Camp, Chhawla, New Delhi - 110071, India', function(err, data) {
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("hello");
//                 console.log(data);
//             }
//         });

var storeRoutes = require("./routes/stores");
app.use(storeRoutes);

app.listen(5000, function(req, res) {
    console.log("Server has been started....");
});