const trafficInfo =require("../models/trafficInfo");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newTrafficInfo = new trafficInfo(req.body);
    await newTrafficInfo.save();
    res.status(201).send(newTrafficInfo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
