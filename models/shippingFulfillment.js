const mongoose = require("mongoose");


const shippingFulfillmentSchema = mongoose.Schema({

    title: String,
    description: String,
});


const ShippingFulfillment = mongoose.model("ShippingFulfillment", shippingFulfillmentSchema);


module.exports.ShippingFulfillment = ShippingFulfillment;