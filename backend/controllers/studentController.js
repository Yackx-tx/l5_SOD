// ========================================
// STUDENT CONTROLLER
// ========================================
// Controllers contain the business logic - the functions that handle requests
// Each function corresponds to one API endpoint

import Student from "../models/Student.js"

// ========================================
// CREATE - Add a new student to the database
// ========================================
// POST /api/students
export const createStudent = async (req, res, next) => {
  try {
    // Extract data from request body
    const { firstName, lastName, email, rollNumber, dateOfBirth, course, gpa, phoneNumber, address, status } = req.body

    // Check if a student with this email or roll number already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNumber }], // either email OR roll number
    })

    if (existingStudent) {
      return res.status(409).json({
        error: "Student with this email or roll number already exists",
      })
    }

    // Create a new student object
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      rollNumber,
      dateOfBirth,
      course,
      gpa,
      phoneNumber,
      address,
      status,
    })

    // Save the student to the database
    await newStudent.save()

    // Send success response with the created student data
    res.status(201).json({
      message: "Student created successfully",
      data: newStudent,
    })
  } catch (error) {
    next(error) // pass error to error handler
  }
}

// ========================================
// READ - Get all students
// ========================================
// GET /api/students?page=1&limit=10&course=CS
export const getAllStudents = async (req, res, next) => {
  try {
    // Extract query parameters from URL
    const { page = 1, limit = 10, course, status } = req.query

    // Build filter object - used to filter students by course or status
    const filter = {}
    if (course) filter.course = course // if course provided, filter by it
    if (status) filter.status = status

    // Calculate how many records to skip (for pagination)
    // Example: page 2 with limit 10 skips first 10 records
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    // Query database for students
    const students = await Student.find(filter)
      .skip(skip) // skip first X records
      .limit(Number.parseInt(limit)) // limit to X records

    // Get total count of matching students (for pagination info)
    const total = await Student.countDocuments(filter)

    // Send response with students and pagination info
    res.status(200).json({
      message: "Students retrieved successfully",
      data: students,
      pagination: {
        total: total,
        pages: Math.ceil(total / Number.parseInt(limit)),
        currentPage: Number.parseInt(page),
        limit: Number.parseInt(limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

// ========================================
// READ - Get a single student by ID
// ========================================
// GET /api/students/507f1f77bcf86cd799439011
export const getStudentById = async (req, res, next) => {
  try {
    // Extract ID from URL parameter
    const { id } = req.params

    // Query database for student with this ID
    const student = await Student.findById(id)

    // If student not found, return error
    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      })
    }

    // Send the student data
    res.status(200).json({
      message: "Student retrieved successfully",
      data: student,
    })
  } catch (error) {
    next(error)
  }
}

// ========================================
// UPDATE - Modify an existing student
// ========================================
// PUT /api/students/507f1f77bcf86cd799439011
export const updateStudent = async (req, res, next) => {
  try {
    // Extract ID from URL and data from request body
    const { id } = req.params
    const { firstName, lastName, email, rollNumber, dateOfBirth, course, gpa, phoneNumber, address, status } = req.body

    // Check if student exists
    const existingStudent = await Student.findById(id)
    if (!existingStudent) {
      return res.status(404).json({
        error: "Student not found",
      })
    }

    // If updating email or roll number, check for duplicates
    if (email || rollNumber) {
      const duplicate = await Student.findOne({
        $or: [
          email && { email, _id: { $ne: id } }, // email must be unique (except this student)
          rollNumber && { rollNumber, _id: { $ne: id } }, // roll number must be unique
        ].filter(Boolean),
      })

      if (duplicate) {
        return res.status(409).json({
          error: "Email or roll number already exists",
        })
      }
    }

    // Update the student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          // $set: only update the fields provided
          firstName,
          lastName,
          email,
          rollNumber,
          dateOfBirth,
          course,
          gpa,
          phoneNumber,
          address,
          status,
        },
      },
      { new: true, runValidators: true }, // new: return updated data, runValidators: apply schema rules
    )

    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    })
  } catch (error) {
    next(error)
  }
}

// ========================================
// DELETE - Remove a student from database
// ========================================
// DELETE /api/students/507f1f77bcf86cd799439011
export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params

    // Find and delete the student in one operation
    const student = await Student.findByIdAndDelete(id)

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      })
    }

    res.status(200).json({
      message: "Student deleted successfully",
      data: student,
    })
  } catch (error) {
    next(error)
  }
}

// ========================================
// BONUS - Get students by course
// ========================================
// GET /api/students/course/CS
export const getStudentsByCourse = async (req, res, next) => {
  try {
    const { course } = req.params
    const { page = 1, limit = 10 } = req.query

    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    // Find all students with this course
    const students = await Student.find({ course }).skip(skip).limit(Number.parseInt(limit))

    const total = await Student.countDocuments({ course })

    res.status(200).json({
      message: `Students in ${course} retrieved successfully`,
      data: students,
      pagination: {
        total,
        pages: Math.ceil(total / Number.parseInt(limit)),
        currentPage: Number.parseInt(page),
        limit: Number.parseInt(limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

// ========================================
// BONUS - Get student statistics
// ========================================
// GET /api/students/stats/overview
export const getStudentStats = async (req, res, next) => {
  try {
    // Count total students
    const totalStudents = await Student.countDocuments()

    // Count students by status
    const activeStudents = await Student.countDocuments({ status: "active" })
    const inactiveStudents = await Student.countDocuments({ status: "inactive" })
    const graduatedStudents = await Student.countDocuments({ status: "graduated" })

    // Get statistics grouped by course using aggregation
    const courseStats = await Student.aggregate([
      {
        $group: {
          // group documents by course
          _id: "$course", // group by course field
          count: { $sum: 1 }, // count students in each course
          avgGpa: { $avg: "$gpa" }, // calculate average GPA per course
        },
      },
      { $sort: { count: -1 } }, // sort by count (highest first)
    ])

    res.status(200).json({
      message: "Student statistics retrieved successfully",
      data: {
        totalStudents,
        byStatus: {
          active: activeStudents,
          inactive: inactiveStudents,
          graduated: graduatedStudents,
        },
        byCourse: courseStats,
      },
    })
  } catch (error) {
    next(error)
  }
}
