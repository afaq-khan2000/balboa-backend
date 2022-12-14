const express = require("express");
let router = express.Router();
let { ShippingFulfillment } = require("../models/shippingFulfillment");

router.get("/", async (req, res) => {
  const shippingFulfillments = await ShippingFulfillment.find();
  res.send(shippingFulfillments);
});

router.get("/:id", async (req, res) => {
  const shippingFulfillment = await ShippingFulfillment.findById(req.params.id);
  res.send(shippingFulfillment);
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;

  const shippingFulfillment = await ShippingFulfillment.findByIdAndUpdate(
    req.params.id,
    { title, description }
  );
  await shippingFulfillment.save();
  return res.status(200).send(`Success`);
});
router.post("/add", async (req, res) => {
  const { title, description } = req.body;

  const shippingFulfillment = new ShippingFulfillment({
    title,
    description,
  });
  await shippingFulfillment.save();
  return res.status(200).send(`Success`);
});

module.exports = router;
