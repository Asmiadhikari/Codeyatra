// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import connectDB from "./db.connect.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();


const foodSchema = new mongoose.Schema({
  foodItem: String,
  quantity: Number,
  foodType: String,
  pickupDate: String,
  pickupTime: String,
  urgency: String,
  proximity: Number,
});

const Food = mongoose.model('Food', foodSchema);

// POST Route to save food data
app.post('/api/food', async (req, res) => {
  try {
    const { foodItem, quantity, foodType, pickupDate, pickupTime, urgency, proximity } = req.body;

    const newFood = new Food({
      foodItem,
      quantity,
      foodType,
      pickupDate,
      pickupTime,
      urgency,
      proximity,
    });

    await newFood.save();
    res.status(201).json({ message: 'Food details saved successfully!' });
  } catch (error) {
    console.error('Error saving food data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
