import { body, validationResult } from "express-validator"

// Validation rules for creating a student
export const validateCreateStudent = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("rollNumber")
    .trim()
    .notEmpty()
    .withMessage("Roll number is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Roll number must be between 3 and 20 characters"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO 8601 date"),
  body("course")
    .trim()
    .notEmpty()
    .withMessage("Course is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Course must be between 2 and 100 characters"),
  body("gpa").optional().isFloat({ min: 0, max: 4.0 }).withMessage("GPA must be between 0 and 4.0"),
  body("phoneNumber")
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
]

// Validation rules for updating a student
export const validateUpdateStudent = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),
  body("email").optional().trim().isEmail().withMessage("Must be a valid email address").normalizeEmail(),
  body("rollNumber")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Roll number must be between 3 and 20 characters"),
  body("dateOfBirth").optional().isISO8601().withMessage("Date of birth must be a valid ISO 8601 date"),
  body("course")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Course must be between 2 and 100 characters"),
  body("gpa").optional().isFloat({ min: 0, max: 4.0 }).withMessage("GPA must be between 0 and 4.0"),
  body("phoneNumber")
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),
]

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    })
  }
  next()
}
