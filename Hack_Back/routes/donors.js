import express from "express"
import DonatedFood from "../models/DonatedFood.js"
import User from "../models/User.js"

const router = express.Router()

// Basic test route
router.get("/test", (req, res) => {
  res.json({ message: "Donors route is working!" })
})

// Get all donors
router.get("/", async (req, res) => {
  try {
    // First, let's just try to get the raw data
    const donatedFoods = await DonatedFood.find().lean()
    const users = await User.find().lean()

    console.log("DonatedFoods found:", donatedFoods.length)
    console.log("Users found:", users.length)

    // If we have no data, return an empty array instead of 404
    if (!donatedFoods.length) {
      return res.json([])
    }

    const donors = donatedFoods.map((food) => {
      const user = users.find((u) => String(u._id) === String(food.donor))
      return {
        id: food._id,
        name: user?.name || "Unknown",
        foodType: food.foodItem,
        quantity: `${food.quantity || 0} plates`,
        location: user ? `${user.latitude}, ${user.longitude}` : "N/A",
        latitude: user ?.latitude,
        longitude: user ?.longitude,
        contactNumber: user?.contact || "Not Available",
        availableUntil: food.pickupDate ? new Date(food.pickupDate).toLocaleDateString() : "N/A",
        proximity: food.proximity || "N/A",
      }
    })

    res.json(donors)
  } catch (error) {
    console.error("Error in /api/donors:", error)
    res.status(500).json({ error: error.message })
  }
})

export default router

