const express = require("express");
let router = express.Router();
let { TradeFinance } = require("../models/tradeFinance");

router.get("/", async (req, res) => {
  const tradeFinances = await TradeFinance.find();
  res.send(tradeFinances);
});

router.get("/:id", async (req, res) => {
  const tradeFinance = await TradeFinance.findById(req.params.id);
  res.send(tradeFinance);
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;

  const tradeFinance = await TradeFinance.findByIdAndUpdate(
    req.params.id,
    { title, description }
  );
  await tradeFinance.save();
  return res.status(200).send(`Success`);
});

router.post("/add", async (req, res) => {
  const { title, description } = req.body;

  const tradeFinance = new TradeFinance({
    title,
    description,
  });
  await tradeFinance.save();
  return res.status(200).send(`Success`);
});

module.exports = router;
