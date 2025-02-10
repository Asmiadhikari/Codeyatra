// index.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import foodRoutes from "./routes/food.js"
import connectDB from "./db.connect.js"
import donorRoutes from "./routes/donors.js"

dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever port your React app is running on
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())

// Connect to Database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use("/api/donors", donorRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!", error: err.message })
})

// Start the Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

