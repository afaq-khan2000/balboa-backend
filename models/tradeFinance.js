const mongoose = require("mongoose");


const tradeFinanceSchema = mongoose.Schema({

    title: String,
    description: String,
});


const TradeFinance = mongoose.model("TradeFinance", tradeFinanceSchema);


module.exports.TradeFinance = TradeFinance;