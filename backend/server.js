// ========================================
// STUDENT MANAGEMENT API - MAIN SERVER FILE
// ========================================
// This file sets up the Express server and connects to MongoDB

// Import required libraries
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import studentRoutes from "./routes/students.js"
import errorHandler from "./middleware/errorHandler.js"

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/student_management"

// ========================================
// MIDDLEWARE - Functions that process requests before they reach routes
// ========================================

// CORS: Allows requests from different domains (needed for frontend later)
app.use(cors())

// JSON Parser: Converts JSON data from requests into JavaScript objects
app.use(express.json())

// URL-encoded Parser: Handles form submissions
app.use(express.urlencoded({ extended: true }))

// ========================================
// DATABASE CONNECTION
// ========================================
// Connect to MongoDB - a NoSQL database that stores our student data
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✓ Connected to MongoDB"))
  .catch((err) => console.error("✗ MongoDB connection error:", err))

// ========================================
// ROUTES
// ========================================
// All student-related endpoints start with /api/students
app.use("/api/students", studentRoutes)

// Health check endpoint - test if server is running
// Try this in Postman: GET http://localhost:5000/health
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    timestamp: new Date(),
  })
})

// 404 Handler - if user requests a route that doesn't exist
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handling middleware (MUST be last)
app.use(errorHandler)

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   Student Management API              ║
  ║   Running on http://localhost:${PORT}    ║
  ║   Environment: ${process.env.NODE_ENV || "development"}      ║
  ╚════════════════════════════════════════╝
  `)
})
