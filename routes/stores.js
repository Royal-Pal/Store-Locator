var express = require("express"),
    router = express.Router();

var Store = require("../models/Store");

var NodeGeocoder = require("node-geocoder");

    var options = {
        provider: process.env.GEOCODER_PROVIDER,
        httpAdapter: 'https',
        apiKey: process.env.GEOCODER_API_KEY,
        formatter: null
    };

var geocoder = NodeGeocoder(options);

router.get("/", function(req, res) {
    // geocoder.geocode('New Delhi, India', function(err, data) {
    //         if(err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log("hello");
    //             console.log(data);
    //         }
    //     });
    res.redirect("/stores");
});

router.get("/stores", function(req, res) {
    Store.find({}, function(err, allStores) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("stores/index", {store: allStores});
        }
    }); 
});

router.get("/stores/new", function(req, res) {
    res.render("stores/new");
}); 

router.post("/stores", function(req, res) {
    var store_id = req.body.store_id;
    var address = req.body.address;

    geocoder.geocode(address, function(err, data) {
        if(err || data.length == 0) {
            console.log(err);
            res.redirect("back");
        }
        else {
            var formattedAddress = data[0].formattedAddress,
                lat = data[0].latitude,
                lng = data[0].longitude;

            var newStore = new Store({
                storeId: store_id,
                address: formattedAddress,
                lat: lat,
                lng: lng
            });

            newStore.save();
        }
    });
});

module.exports = router;