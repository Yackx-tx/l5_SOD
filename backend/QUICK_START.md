# Quick Start Guide

Get the Student Management API running in 5 minutes!

## Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- npm

## Installation

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```
   MONGODB_URI=mongodb://localhost:27017/student_management
   PORT=5000
   NODE_ENV=development
   ```

4. **Start server**
   ```bash
   npm run dev
   ```

   Output: `Student Management API server running on port 5000`

## First API Call

### Using cURL

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice@university.edu",
    "rollNumber": "STU001",
    "dateOfBirth": "2002-08-20",
    "course": "Computer Science",
    "gpa": 3.9
  }'
```

### Using Postman

1. Import `Student_Management_API.postman_collection.json`
2. Click "Create Student" request
3. Click Send
4. See the response!

## Core Endpoints

```
POST   /api/students              Create student
GET    /api/students              List all students
GET    /api/students/:id          Get one student
PUT    /api/students/:id          Update student
DELETE /api/students/:id          Delete student
```

## Test Everything

Run the complete test suite from [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [README.md](./README.md) - Full setup and features
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing procedures

## Need Help?

1. Check MongoDB is running: `mongod`
2. Verify `.env` configuration
3. Check server is on port 5000
4. Test health endpoint: `curl http://localhost:5000/health`

---

Ready to build the frontend? The API is ready to connect!
