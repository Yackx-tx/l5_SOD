// ========================================
// STUDENT ROUTES
// ========================================
// This file defines all the API endpoints (URLs) for student operations
// Routes connect URL paths to their corresponding controller functions

import express from "express"
import * as studentController from "../controllers/studentController.js"
import { validateCreateStudent, validateUpdateStudent, handleValidationErrors } from "../middleware/validation.js"

const router = express.Router()

// ========================================
// IMPORTANT: Route order matters!
// Specific routes (with :id) must come AFTER general routes
// Otherwise GET /stats/overview would be treated as finding student with id "stats"
// ========================================

// ========================================
// COLLECTION ENDPOINTS (whole table operations)
// ========================================

// POST /api/students - Create a new student
// Usage: Send student data in request body
router.post("/", validateCreateStudent, handleValidationErrors, studentController.createStudent)

// GET /api/students - Get all students with pagination
// Usage: GET /api/students?page=1&limit=10&course=CS&status=active
router.get("/", studentController.getAllStudents)

// ========================================
// SPECIAL ENDPOINTS (must be BEFORE /:id routes)
// ========================================

// GET /api/students/stats/overview - Get student statistics
// Usage: View total students, by status, by course, etc.
router.get("/stats/overview", studentController.getStudentStats)

// GET /api/students/course/:course - Get students by course
// Usage: GET /api/students/course/CS
router.get("/course/:course", studentController.getStudentsByCourse)

// ========================================
// SPECIFIC RESOURCE ENDPOINTS (single record operations)
// ========================================

// GET /api/students/:id - Get a single student by ID
// Usage: GET /api/students/507f1f77bcf86cd799439011
router.get("/:id", studentController.getStudentById)

// PUT /api/students/:id - Replace entire student record
// Usage: Send complete student data in request body
router.put("/:id", validateUpdateStudent, handleValidationErrors, studentController.updateStudent)

// PATCH /api/students/:id - Update only specific fields
// Usage: Send only fields you want to update
router.patch("/:id", validateUpdateStudent, handleValidationErrors, studentController.updateStudent)

// DELETE /api/students/:id - Delete a student
// Usage: DELETE /api/students/507f1f77bcf86cd799439011
router.delete("/:id", studentController.deleteStudent)

export default router
