var mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({
    storeId: String,
    address: String,
    lat: Number,
    lng: Number
});

// var storeSchema = new mongoose.Schema({
//     storeId: {
//         type: String,
//         required: ["true", "Please add a Store ID"],
//         unique: true,
//         trim: true,
//         maxlength: ["10", "Store ID must be less than 10 chars"]
//     },
//     // location: {
//     //     type: {
//     //         type: String,
//     //         enum: ['Point'],
//     //         required: true
//     //     }
//     // },
//     address: {
//         type: String,
//         required: ["true", "Please add an Address"]
//     },
//     coordinates: {
//         type: [Number],
//         required: true,
//         index: "2dsphere"
//     },
//     formattedAddress: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

module.exports = mongoose.model("Store", storeSchema);