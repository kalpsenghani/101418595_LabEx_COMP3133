const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");


router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cuisine/:cuisineType", async (req, res) => {
  try {
    const { cuisineType } = req.params;
    const restaurants = await Restaurant.find({ cuisine: cuisineType });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get restaurants sorted by restaurant_id (ASC or DESC)
router.get("/", async (req, res) => {
  try {
    const sortBy = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find({}, { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }).sort({ restaurant_id: sortBy });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Delicatessen restaurants not in Brooklyn, sorted by name
router.get("/cuisine/:cuisineType", async (req, res) => {
  const { cuisineType } = req.params;
  if (cuisineType === "Delicatessen") {
    return res.redirect("/restaurants/Delicatessen");
  }
  try {
    const restaurants = await Restaurant.find({ cuisine: cuisineType });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
