# Student Management API - Beginner's Guide

## What is this?

This is a **REST API** (Application Programming Interface) built with Node.js, Express, and MongoDB. It allows you to:
- Create student records
- View student information
- Update student details
- Delete student records

Think of it like a digital filing system for students!

## Key Concepts to Understand

### What is REST?
REST = Representational State Transfer

It's a way to build web APIs using standard HTTP methods:
- **GET** = Read/Retrieve data
- **POST** = Create new data
- **PUT** = Replace/Update all fields
- **PATCH** = Update only some fields
- **DELETE** = Remove data

### What is MongoDB?
MongoDB is a **NoSQL database** that stores data as JSON-like objects. Instead of tables (like Excel), it uses "collections" and "documents".

Example: A student document looks like this:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "rollNumber": "2024001",
  "course": "Computer Science",
  "gpa": 3.8,
  "status": "active"
}
```

## API Endpoints Explained

### 1. Create a Student
**Method:** `POST`  
**URL:** `http://localhost:5000/api/students`  
**Data to send:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "rollNumber": "2024001",
  "dateOfBirth": "2005-05-15",
  "course": "Computer Science",
  "gpa": 3.8,
  "phoneNumber": "1234567890",
  "status": "active"
}
```

### 2. Get All Students
**Method:** `GET`  
**URL:** `http://localhost:5000/api/students`  
**Optional filters:**
- `?page=1&limit=10` - pagination (page 1, 10 students per page)
- `?course=CS` - filter by course
- `?status=active` - filter by status

### 3. Get One Student
**Method:** `GET`  
**URL:** `http://localhost:5000/api/students/507f1f77bcf86cd799439011`  
(Replace with actual student ID)

### 4. Update a Student
**Method:** `PUT` or `PATCH`  
**URL:** `http://localhost:5000/api/students/507f1f77bcf86cd799439011`  
**Data to send:** (only the fields you want to change)
```json
{
  "gpa": 3.9,
  "status": "inactive"
}
```

### 5. Delete a Student
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/students/507f1f77bcf86cd799439011`

### 6. Get Students by Course
**Method:** `GET`  
**URL:** `http://localhost:5000/api/students/course/CS`

### 7. Get Statistics
**Method:** `GET`  
**URL:** `http://localhost:5000/api/students/stats/overview`  
**Returns:** Total students, by status, average GPA by course

## HTTP Status Codes

APIs use status codes to tell you if something worked:

- **200** = OK - Request successful
- **201** = Created - New resource created
- **400** = Bad Request - Invalid data
- **404** = Not Found - Resource doesn't exist
- **409** = Conflict - Duplicate (email or roll number already exists)
- **500** = Server Error - Something went wrong on the server

## File Structure Explained

```
backend/
├── server.js                 # Main server file - starts the app
├── models/Student.js         # Defines what a student record looks like
├── controllers/studentController.js  # Functions that handle requests
├── routes/students.js        # URLs and which functions to use
├── middleware/
│   ├── errorHandler.js       # Catches and handles errors
│   └── validation.js         # Checks if data is valid
└── package.json              # List of installed libraries
```

## Testing with Postman

1. Open Postman
2. Import the `Student_Management_API.postman_collection.json` file
3. This gives you pre-built requests for all endpoints
4. Click "Send" to test each endpoint

## Common Errors & Solutions

### Error: "Student with this email already exists"
**Cause:** Email must be unique. Each student needs different email.  
**Solution:** Use a different email address.

### Error: "Roll number already exists"
**Cause:** Roll number must be unique.  
**Solution:** Use a different roll number.

### Error: "Phone number must be 10 digits"
**Cause:** Phone validation requires exactly 10 digits.  
**Solution:** Enter exactly 10 numbers.

### Error: "Please provide a valid email"
**Cause:** Email format is invalid.  
**Solution:** Use format like `john@example.com`

## Next Steps

Once you understand this API:
1. Build a frontend (web app or mobile app) that uses these endpoints
2. Add authentication (login/password)
3. Add more features (grades, attendance, etc.)
4. Deploy to the internet

Good luck! 🚀
