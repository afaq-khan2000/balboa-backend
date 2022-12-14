const mongoose = require("mongoose");


const mailSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    subject: String,
    message: {
        type: String,
        required: true
    },
    phone: String,
    date: { type: Date, default: Date.now }
});


const Mail = mongoose.model("Mail", mailSchema);


module.exports.Mail = Mail;