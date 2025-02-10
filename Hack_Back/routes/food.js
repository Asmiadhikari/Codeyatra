import DonatedFood from "../models/DonatedFood.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming you need to find the donor by email

// Example function to create a new donation
export default async function donateFood(req, res) {
  const {
    foodItem,
    foodType,
    quantity,
    pickupDate,
    pickupTime,
    proximity,
    availableUntil,
    donorEmail,
    token,
  } = req.body;

  try {
    // Find the donor by email (or any other field that identifies the donor)
    
      const decode = jwt.verify(token, "yourSecretKey");
    const donor = await User.findOne({ email: decode.email });

    if (!donor) {
      return res.status(400).json({ error: "Donor not found" });
    }

    // Create a new DonatedFood document with the donor's _id
    const newDonation = new DonatedFood({
      donor: decode.userId, // Assign donor's _id here
      foodItem,
      foodType,
      quantity,
      pickupDate,
      pickupTime,
      proximity,
      availableUntil,
    });

    // Save the donation
    await newDonation.save();

    res.status(201).json({ message: "Food donation successfully recorded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record the donation" });
  }
}
