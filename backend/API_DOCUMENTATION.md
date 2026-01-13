# Student Management API Documentation

## Overview
This is a RESTful API for managing student records. Built with Node.js, Express, and MongoDB, it provides comprehensive CRUD operations for student data with validation, error handling, and pagination support.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, this API does not require authentication. For production use, implement JWT authentication.

---

## Endpoints

### 1. Create a New Student
**POST** `/students`

Creates a new student record in the database.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@university.edu",
  "rollNumber": "STU001",
  "dateOfBirth": "2002-05-15",
  "course": "Computer Science",
  "gpa": 3.8,
  "phoneNumber": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "Illinois",
    "zipCode": "62701",
    "country": "USA"
  },
  "status": "active"
}
```

**Success Response (201 Created):**
```json
{
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@university.edu",
    "rollNumber": "STU001",
    "dateOfBirth": "2002-05-15T00:00:00.000Z",
    "course": "Computer Science",
    "gpa": 3.8,
    "phoneNumber": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "state": "Illinois",
      "zipCode": "62701",
      "country": "USA"
    },
    "enrollmentDate": "2024-01-13T10:30:00.000Z",
    "status": "active",
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Must be a valid email address"
    }
  ]
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Student with this email or roll number already exists"
}
```

**Required Fields:**
- `firstName` (string, 2-50 characters)
- `lastName` (string, 2-50 characters)
- `email` (string, valid email format, unique)
- `rollNumber` (string, 3-20 characters, unique)
- `dateOfBirth` (string, ISO 8601 format: YYYY-MM-DD)
- `course` (string, 2-100 characters)

**Optional Fields:**
- `gpa` (number, 0-4.0)
- `phoneNumber` (string, 10 digits)
- `address` (object with street, city, state, zipCode, country)
- `status` (string: "active", "inactive", "graduated", "suspended")

---

### 2. Get All Students
**GET** `/students`

Retrieves all students with pagination and filtering support.

**Query Parameters:**
- `page` (number, default: 1) - Page number for pagination
- `limit` (number, default: 10) - Number of records per page
- `course` (string, optional) - Filter by course name
- `status` (string, optional) - Filter by status
- `sortBy` (string, default: "-createdAt") - Sort field with - prefix for descending

**Example Request:**
```
GET /students?page=1&limit=10&course=Computer%20Science&sortBy=-gpa
```

**Success Response (200 OK):**
```json
{
  "message": "Students retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@university.edu",
      "rollNumber": "STU001",
      "course": "Computer Science",
      "gpa": 3.8,
      "status": "active",
      "createdAt": "2024-01-13T10:30:00.000Z",
      "updatedAt": "2024-01-13T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "pages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### 3. Get Student by ID
**GET** `/students/:id`

Retrieves a specific student's complete information by their MongoDB ID.

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the student

**Example Request:**
```
GET /students/507f1f77bcf86cd799439011
```

**Success Response (200 OK):**
```json
{
  "message": "Student retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@university.edu",
    "rollNumber": "STU001",
    "dateOfBirth": "2002-05-15T00:00:00.000Z",
    "course": "Computer Science",
    "gpa": 3.8,
    "phoneNumber": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "state": "Illinois",
      "zipCode": "62701",
      "country": "USA"
    },
    "enrollmentDate": "2024-01-13T10:30:00.000Z",
    "status": "active",
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Student not found"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid ID format"
}
```

---

### 4. Update a Student
**PUT** `/students/:id`

Replaces the entire student record (all fields must be provided).

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the student

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@university.edu",
  "rollNumber": "STU001",
  "dateOfBirth": "2002-05-15",
  "course": "Information Technology",
  "gpa": 3.9,
  "phoneNumber": "9876543210",
  "address": {
    "street": "456 Oak Ave",
    "city": "Shelbyville",
    "state": "Illinois",
    "zipCode": "62702",
    "country": "USA"
  },
  "status": "active"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@university.edu",
    "rollNumber": "STU001",
    "course": "Information Technology",
    "gpa": 3.9,
    "status": "active",
    "updatedAt": "2024-01-13T11:45:00.000Z"
  }
}
```

**Note:** Use **PATCH** `/students/:id` to partially update only specific fields.

---

### 5. Partially Update a Student
**PATCH** `/students/:id`

Partially updates a student record (only provided fields are updated).

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the student

**Request Body (example - only updating GPA):**
```json
{
  "gpa": 3.95
}
```

**Success Response (200 OK):**
```json
{
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "gpa": 3.95,
    "updatedAt": "2024-01-13T11:50:00.000Z"
  }
}
```

---

### 6. Delete a Student
**DELETE** `/students/:id`

Permanently deletes a student record from the database.

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the student

**Example Request:**
```
DELETE /students/507f1f77bcf86cd799439011
```

**Success Response (200 OK):**
```json
{
  "message": "Student deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@university.edu",
    "rollNumber": "STU001",
    "status": "active"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Student not found"
}
```

---

### 7. Get Students by Course
**GET** `/students/course/:course`

Retrieves all students enrolled in a specific course.

**URL Parameters:**
- `course` (string) - Course name

**Query Parameters:**
- `page` (number, default: 1) - Page number for pagination
- `limit` (number, default: 10) - Number of records per page

**Example Request:**
```
GET /students/course/Computer%20Science?page=1&limit=15
```

**Success Response (200 OK):**
```json
{
  "message": "Students in Computer Science retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "course": "Computer Science",
      "gpa": 3.8
    }
  ],
  "pagination": {
    "total": 28,
    "pages": 2,
    "currentPage": 1,
    "limit": 15
  }
}
```

---

### 8. Get Student Statistics
**GET** `/students/stats/overview`

Retrieves aggregate statistics about students including counts by status and course, and average GPA by course.

**Example Request:**
```
GET /students/stats/overview
```

**Success Response (200 OK):**
```json
{
  "message": "Student statistics retrieved successfully",
  "data": {
    "totalStudents": 150,
    "byStatus": {
      "active": 120,
      "inactive": 15,
      "graduated": 12,
      "suspended": 3
    },
    "byCourse": [
      {
        "_id": "Computer Science",
        "count": 45,
        "avgGpa": 3.75
      },
      {
        "_id": "Information Technology",
        "count": 38,
        "avgGpa": 3.68
      },
      {
        "_id": "Business Administration",
        "count": 35,
        "avgGpa": 3.62
      }
    ]
  }
}
```

---

## HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT, PATCH, DELETE operations |
| 201 | Created | Successful POST (resource creation) |
| 400 | Bad Request | Invalid input, validation errors |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email or roll number |
| 500 | Internal Server Error | Server-side error |

---

## Error Handling

All errors follow a consistent format:

**Validation Error:**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Must be a valid email address"
    },
    {
      "field": "phoneNumber",
      "message": "Phone number must be 10 digits"
    }
  ]
}
```

**Server Error:**
```json
{
  "error": "Internal Server Error"
}
```

---

## Validation Rules

### Email
- Must be a valid email format
- Must be unique (no duplicates)
- Automatically normalized to lowercase

### Roll Number
- 3-20 characters
- Must be unique
- Whitespace will be trimmed

### Phone Number
- Exactly 10 digits
- Optional field
- Numbers only

### GPA
- Between 0 and 4.0
- Optional field
- Defaults to 0

### Date of Birth
- Must be in ISO 8601 format (YYYY-MM-DD)
- Required field

### Status
- Must be one of: "active", "inactive", "graduated", "suspended"
- Defaults to "active"

---

## Pagination

For endpoints that return lists, pagination is supported via query parameters:

**Example:**
```
GET /students?page=2&limit=20
```

**Response includes:**
```json
{
  "pagination": {
    "total": 150,
    "pages": 8,
    "currentPage": 2,
    "limit": 20
  }
}
```

- `total`: Total number of records matching the filter
- `pages`: Total number of pages
- `currentPage`: Current page number
- `limit`: Records per page

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Steps

1. **Clone/Download the project**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/student_management
PORT=5000
NODE_ENV=development
```

4. **Start the server**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

5. **Verify the server**
```
GET http://localhost:5000/health
```

Expected response:
```json
{
  "message": "Server is running",
  "timestamp": "2024-01-13T10:30:00.000Z"
}
```

---

## Testing with Postman

### Import the Collection
1. Open Postman
2. Click "Import"
3. Import the `Student_Management_API.postman_collection.json` file
4. Select your environment or use the provided variables

### Environment Variables in Postman
Set these in Postman's environment configuration:
- `baseUrl`: http://localhost:5000/api
- `studentId`: (set after creating a student - copy the _id from response)

### Sample Testing Flow
1. **Create Student** - POST /students
2. **Get All Students** - GET /students
3. **Get Student by ID** - GET /students/{id}
4. **Update Student** - PUT /students/{id}
5. **Delete Student** - DELETE /students/{id}

---

## Best Practices

1. **Error Handling**: Always check the response status code
2. **Validation**: The API validates all input; follow the required format
3. **Unique Constraints**: Email and roll number must be unique
4. **Pagination**: Use pagination for large datasets
5. **Filtering**: Use query parameters to filter results
6. **Data Format**: Always send timestamps in ISO 8601 format
7. **API Rate Limiting**: Consider implementing rate limiting in production
8. **Authentication**: Implement JWT authentication for production use

---

## Future Enhancements

- JWT authentication and authorization
- Role-based access control (admin, student, staff)
- Search functionality across multiple fields
- Export data to CSV/PDF
- Advanced filtering and sorting
- API rate limiting
- Request logging and monitoring
- Unit and integration tests
