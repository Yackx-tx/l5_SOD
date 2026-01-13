# Testing Guide for Student Management API

This guide provides step-by-step instructions for testing all endpoints of the Student Management API using Postman.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Testing All Endpoints](#testing-all-endpoints)
3. [Test Scenarios](#test-scenarios)
4. [Validation Testing](#validation-testing)
5. [Error Handling Tests](#error-handling-tests)

---

## Setup Instructions

### 1. Install and Run the Backend

```bash
cd backend
npm install
npm run dev
```

Wait for: `Student Management API server running on port 5000`

### 2. Verify Server is Running

```bash
curl http://localhost:5000/health
```

### 3. Import Postman Collection

1. Open Postman
2. Click **Import**
3. Select `Student_Management_API.postman_collection.json`

### 4. Create Environment

1. Click **Manage Environments** (gear icon)
2. Click **Create**
3. Add variables:

```
baseUrl: http://localhost:5000/api
studentId: (will update after first create)
```

4. Click **Save** and select environment

---

## Testing All Endpoints

### 1. Create a Student (POST)

**Endpoint:** `POST /students`

**Action:**
1. Go to "Create Student" request
2. The body contains valid sample data
3. Click **Send**

**Expected Response (201):**
```json
{
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@university.edu",
    "rollNumber": "STU001",
    ...
  }
}
```

**✓ Save the `_id`:** Copy the returned `_id` and paste it as the `studentId` environment variable.

---

### 2. Get All Students (GET)

**Endpoint:** `GET /students`

**Action:**
1. Go to "Get All Students" request
2. Query parameters are pre-configured
3. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Students retrieved successfully",
  "data": [
    { /* student 1 */ },
    { /* student 2 */ }
  ],
  "pagination": {
    "total": 1,
    "pages": 1,
    "currentPage": 1,
    "limit": 10
  }
}
```

**Test Variations:**
- Change `page` to 2
- Change `limit` to 5
- Add `course=Computer Science` parameter
- Add `status=active` parameter
- Add `sortBy=-gpa` parameter

---

### 3. Get Student by ID (GET)

**Endpoint:** `GET /students/:id`

**Action:**
1. Go to "Get Student by ID" request
2. URL uses `{{studentId}}` variable
3. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Student retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    ...
  }
}
```

**Error Test:**
- Manually change the ID in the URL to an invalid one
- Send request
- Should receive 404 error

---

### 4. Update Student - PUT (PATCH method)

**Endpoint:** `PUT /students/:id`

**Action:**
1. Go to "Update Student (PUT)" request
2. Update the request body with new data
3. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Smith",
    ...
  }
}
```

**Test with partial data:**
1. Go to "Partially Update Student (PATCH)"
2. Update only specific fields:
   ```json
   {
     "gpa": 3.95,
     "status": "graduated"
   }
   ```
3. Click **Send**

---

### 5. Delete Student (DELETE)

**Endpoint:** `DELETE /students/:id`

**Action:**
1. Go to "Delete Student" request
2. Ensure `{{studentId}}` is in the URL
3. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Student deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

**Verify Deletion:**
1. Run "Get Student by ID" with same ID
2. Should receive 404 error

---

### 6. Get Students by Course (GET)

**Endpoint:** `GET /students/course/:course`

**Action:**
1. Go to "Get Students by Course" request
2. Course is URL-encoded to `Computer%20Science`
3. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Students in Computer Science retrieved successfully",
  "data": [
    { /* students in course */ }
  ],
  "pagination": { ... }
}
```

**Test Different Courses:**
- Change `Computer%20Science` to other course names
- Try `Information%20Technology`
- Try `Business%20Administration`

---

### 7. Get Statistics (GET)

**Endpoint:** `GET /students/stats/overview`

**Action:**
1. Go to "Get Student Statistics" request
2. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Student statistics retrieved successfully",
  "data": {
    "totalStudents": 1,
    "byStatus": {
      "active": 1,
      "inactive": 0,
      "graduated": 0,
      "suspended": 0
    },
    "byCourse": [
      {
        "_id": "Computer Science",
        "count": 1,
        "avgGpa": 3.8
      }
    ]
  }
}
```

---

## Test Scenarios

### Scenario 1: Create Multiple Students

1. Create 3-5 students with different data
2. For each, change:
   - `firstName` and `lastName`
   - `email` (must be unique)
   - `rollNumber` (must be unique)
   - `course`
3. Note all the `_id` values returned

---

### Scenario 2: Test Pagination

1. Create 25+ students
2. Run "Get All Students" with `limit=10`
3. Results show page 1 of 3
4. Change `page` to 2, send again
5. Results show different students
6. Change `page` to 3, verify final page

---

### Scenario 3: Test Filtering

1. Create 10 students with varied data:
   - 5 with "Computer Science" course
   - 3 with "Business" course
   - 2 with "Engineering" course
   - Mix of statuses: active, inactive, graduated

2. Test filter by course:
   ```
   GET /students?course=Computer%20Science
   ```
   Should return 5 students

3. Test filter by status:
   ```
   GET /students?status=active
   ```
   Should return only active students

4. Test combined filters:
   ```
   GET /students?course=Computer%20Science&status=active
   ```

---

### Scenario 4: Test Sorting

1. Create 5 students with different GPAs: 3.0, 3.5, 3.8, 4.0, 3.2

2. Sort by GPA descending:
   ```
   GET /students?sortBy=-gpa
   ```
   Order: 4.0, 3.8, 3.5, 3.2, 3.0

3. Sort by GPA ascending:
   ```
   GET /students?sortBy=gpa
   ```
   Order: 3.0, 3.2, 3.5, 3.8, 4.0

4. Sort by creation date:
   ```
   GET /students?sortBy=-createdAt
   ```
   (Newest first)

---

## Validation Testing

### Test 1: Empty First Name

**Body:**
```json
{
  "firstName": "",
  "lastName": "Doe",
  "email": "test@example.com",
  "rollNumber": "TEST001",
  "dateOfBirth": "2002-05-15",
  "course": "CS"
}
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "firstName",
      "message": "First name is required"
    }
  ]
}
```

---

### Test 2: Invalid Email Format

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "not-an-email",
  "rollNumber": "TEST001",
  "dateOfBirth": "2002-05-15",
  "course": "CS"
}
```

**Expected Response (400):**
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

---

### Test 3: Invalid Date Format

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "rollNumber": "TEST001",
  "dateOfBirth": "15/05/2002",
  "course": "CS"
}
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "dateOfBirth",
      "message": "Date of birth must be a valid ISO 8601 date"
    }
  ]
}
```

---

### Test 4: Phone Number Wrong Format

**Body:**
```json
{
  "phoneNumber": "98765"
}
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "phoneNumber",
      "message": "Phone number must be 10 digits"
    }
  ]
}
```

---

### Test 5: GPA Out of Range

**Body:**
```json
{
  "gpa": 5.0
}
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "gpa",
      "message": "GPA must be between 0 and 4.0"
    }
  ]
}
```

---

### Test 6: Duplicate Email

1. Create first student with `email: "john@example.com"`
2. Try to create second student with same email
3. Change only the email in the request body

**Expected Response (409):**
```json
{
  "error": "Student with this email or roll number already exists"
}
```

---

### Test 7: Duplicate Roll Number

1. Create first student with `rollNumber: "STU001"`
2. Try to create second student with same roll number

**Expected Response (409):**
```json
{
  "error": "Student with this email or roll number already exists"
}
```

---

## Error Handling Tests

### Test 1: Invalid Student ID

**Endpoint:** `GET /students/invalid-id-format`

**Expected Response (400):**
```json
{
  "error": "Invalid ID format"
}
```

---

### Test 2: Non-existent Student

**Endpoint:** `GET /students/507f1f77bcf86cd799439999`

**Expected Response (404):**
```json
{
  "error": "Student not found"
}
```

---

### Test 3: Delete Non-existent Student

**Endpoint:** `DELETE /students/507f1f77bcf86cd799439999`

**Expected Response (404):**
```json
{
  "error": "Student not found"
}
```

---

### Test 4: Missing Required Fields

**Body (missing lastName):**
```json
{
  "firstName": "John",
  "email": "john@example.com",
  "rollNumber": "TEST001",
  "dateOfBirth": "2002-05-15",
  "course": "CS"
}
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "lastName",
      "message": "Last name is required"
    }
  ]
}
```

---

## Performance Testing

### Test 1: Pagination Performance

1. Create 1000 students (use a script or loop)
2. Test different page sizes:
   ```
   GET /students?limit=50
   GET /students?limit=100
   GET /students?limit=500
   ```
3. Measure response times

### Test 2: Filtering Performance

1. Test filtering on large dataset:
   ```
   GET /students?course=Computer%20Science&status=active
   ```
2. Compare with unfiltered request

---

## Automated Testing Notes

For advanced testing, consider using:

- **Postman Test Scripts** - Add JavaScript assertions
- **Newman** - Run Postman collections from CLI
- **Jest** - Unit testing framework
- **Supertest** - HTTP assertion library

---

## Troubleshooting

### Request Returns 500 Error

- Check server logs in terminal
- Verify MongoDB is running
- Check `.env` file configuration

### CORS Errors

- Verify frontend is making requests to correct URL
- Check that CORS middleware is enabled in `server.js`

### Connection Timeout

- Verify MongoDB connection string in `.env`
- Check MongoDB is running
- Test network connectivity to MongoDB server

---

**Last Updated:** January 13, 2024
```

Now let me create a quick start guide:
