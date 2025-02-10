import mongoose from "mongoose";

const donatedFoodSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, // Reference to User (Donor)
  foodItem: { type: String, required: true },
  foodType: {
    type: String,
    enum: [
      "Cooked Meal",
      "Fresh Produce",
      "Bread and Pastries",
      "Canned Goods",
    ],
    
  },
  quantity: { type: Number, },
  pickupDate: { type: Date, },
  pickupTime: { type: String, },
  proximity: { type: Number, }, // Proximity in km
  availableUntil: { type: Date, },
});

// Ensure the collection name is explicitly defined if needed
const DonatedFood = mongoose.model("DonatedFood", donatedFoodSchema, "donatedfoods");

export default DonatedFood;
