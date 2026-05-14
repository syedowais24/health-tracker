const express = require('express');
const router = express.Router();

const Health = require('../models/Health');

router.post('/', async (req, res) => {
  try {
    const health = new Health(req.body);
    await health.save();
    res.status(201).json(health);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Health.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;