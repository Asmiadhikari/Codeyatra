import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup Route
// Signup Route
router.post("/signup", async (req, res) => {
  try {
    // const {
    //   name,
    //   email,
    //   password,
    //   contact,
    //   userType,
    //   recipientType,
    //   latitude,
    //   longitude,
    // } = req.body;
    const body = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User(body);
    newUser.password = hashedPassword;
    if (body.recipientType == "") console.log("hi");
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route - /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || "yourSecretKey", // For testing without .env
      { expiresIn: "1h" }
    );

    // Send successful response
    res.json({
      message: "Login successful",
      token,
      userType: user.userType,
      user: {
        email: user.email,
        userType: user.userType,
        latitude: user.latitude,
        longitude: user.longitude,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
