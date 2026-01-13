// ========================================
// STUDENT DATA MODEL
// ========================================
// This file defines the structure of student data in MongoDB
// Think of it like a blueprint for how student records should look

import mongoose from "mongoose"

// Create a schema - defines what fields a student has and their rules
const studentSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true, // removes extra spaces
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // Email - must be unique (no two students can have same email)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // prevents duplicate emails
      lowercase: true, // converts to lowercase automatically
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },

    // Roll Number - unique identifier for each student
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true, // each student has unique roll number
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    // Personal Information
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    // Academic Information
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    // GPA: Grade Point Average (0 to 4.0 scale)
    gpa: {
      type: Number,
      default: 0, // starts at 0
      min: 0,
      max: 4.0,
    },

    // Contact Information
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
      sparse: true, // optional field
    },

    // Address Information - nested object
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },

    // Enrollment Information
    enrollmentDate: {
      type: Date,
      default: Date.now, // automatically set to current date
    },

    // Student Status
    status: {
      type: String,
      enum: ["active", "inactive", "graduated", "suspended"], // only these values allowed
      default: "active",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  },
)

// Create indexes for faster database queries
// These make searching by email, rollNumber, or course faster
studentSchema.index({ email: 1 })
studentSchema.index({ rollNumber: 1 })
studentSchema.index({ course: 1 })

// Create and export the Student model
// Model = the actual database collection that stores student data
const Student = mongoose.model("Student", studentSchema)

export default Student
