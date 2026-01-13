# Student Management System API

A comprehensive RESTful API for managing student records, built with **Node.js**, **Express**, and **MongoDB**. This backend provides full CRUD operations with robust validation, error handling, and production-ready features.

## Features

✅ **Complete CRUD Operations** - Create, Read, Update, Delete student records  
✅ **RESTful Architecture** - Follows REST best practices and conventions  
✅ **Input Validation** - Comprehensive data validation with express-validator  
✅ **Error Handling** - Centralized error handling with detailed error messages  
✅ **Pagination Support** - Paginate through student lists efficiently  
✅ **Filtering & Sorting** - Filter by course/status, sort by any field  
✅ **MongoDB Integration** - Persistent data storage with Mongoose ODM  
✅ **CORS Enabled** - Ready for frontend integration  
✅ **Postman Ready** - Includes complete Postman collection for testing  
✅ **Statistics Endpoint** - Get aggregate student statistics  

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **express-validator** | Request validation middleware |
| **CORS** | Cross-Origin Resource Sharing |
| **dotenv** | Environment variable management |

## Project Structure

```
backend/
├── server.js                           # Main application entry point
├── package.json                        # Project dependencies
├── .env.example                        # Environment variables template
├── API_DOCUMENTATION.md                # Detailed API documentation
├── README.md                           # This file
├── Student_Management_API.postman_collection.json  # Postman collection
│
├── models/
│   └── Student.js                      # MongoDB Student schema
│
├── controllers/
│   └── studentController.js            # Business logic for student operations
│
├── routes/
│   └── students.js                     # API route definitions
│
└── middleware/
    ├── errorHandler.js                 # Centralized error handling
    └── validation.js                   # Input validation rules
```

## Installation

### Prerequisites

- **Node.js** v14 or higher
- **MongoDB** (local installation or MongoDB Atlas cloud)
- **npm** or **yarn**
- **Postman** (optional, for API testing)

### Step 1: Clone/Download the Project

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

### Step 3: Setup Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/student_management

# Server Configuration
PORT=5000
NODE_ENV=development
```

**MongoDB Connection Examples:**

- **Local MongoDB:**
  ```
  MONGODB_URI=mongodb://localhost:27017/student_management
  ```

- **MongoDB Atlas Cloud (Recommended):**
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management?retryWrites=true&w=majority
  ```

### Step 4: Start the Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The server should start on `http://localhost:5000`

### Step 5: Verify Installation

Test the health endpoint:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "message": "Server is running",
  "timestamp": "2024-01-13T10:30:00.000Z"
}
```

## API Overview

### Base URL

```
http://localhost:5000/api
```

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/students` | Create a new student |
| **GET** | `/students` | Get all students (paginated) |
| **GET** | `/students/:id` | Get a specific student |
| **PUT** | `/students/:id` | Update entire student record |
| **PATCH** | `/students/:id` | Partially update a student |
| **DELETE** | `/students/:id` | Delete a student |
| **GET** | `/students/course/:course` | Get students by course |
| **GET** | `/students/stats/overview` | Get student statistics |

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/health` | Server health check |

## Quick Start Example

### 1. Create a Student

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@university.edu",
    "rollNumber": "STU001",
    "dateOfBirth": "2002-05-15",
    "course": "Computer Science",
    "gpa": 3.8
  }'
```

### 2. Get All Students

```bash
curl http://localhost:5000/api/students?page=1&limit=10
```

### 3. Get Specific Student

```bash
curl http://localhost:5000/api/students/{studentId}
```

### 4. Update a Student

```bash
curl -X PUT http://localhost:5000/api/students/{studentId} \
  -H "Content-Type: application/json" \
  -d '{"gpa": 3.9}'
```

### 5. Delete a Student

```bash
curl -X DELETE http://localhost:5000/api/students/{studentId}
```

## Using Postman

### Import the Collection

1. Open Postman
2. Click **Import** button
3. Select `Student_Management_API.postman_collection.json`
4. The collection will be imported with all endpoints

### Configure Environment Variables

1. Create a new Environment in Postman
2. Add these variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `studentId`: (leave empty, auto-fill after creating a student)

3. Select your environment before running requests

### Test Workflow

1. **Create Student** - POST /students (copy the returned `_id`)
2. **Get All Students** - GET /students
3. **Get Student by ID** - GET /students/{id}
4. **Update Student** - PUT /students/{id}
5. **Delete Student** - DELETE /students/{id}

## Data Model

### Student Schema

```javascript
{
  firstName: String (required, 2-50 chars),
  lastName: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  rollNumber: String (required, unique, 3-20 chars),
  dateOfBirth: Date (required, ISO 8601),
  course: String (required, 2-100 chars),
  gpa: Number (0-4.0, default: 0),
  phoneNumber: String (10 digits, optional),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  enrollmentDate: Date (auto-set to current date),
  status: String (active, inactive, graduated, suspended),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Validation Rules

### Required Fields

| Field | Format | Constraints |
|-------|--------|-------------|
| firstName | String | 2-50 characters, required |
| lastName | String | 2-50 characters, required |
| email | Email | Valid email format, unique, required |
| rollNumber | String | 3-20 characters, unique, required |
| dateOfBirth | ISO 8601 | YYYY-MM-DD format, required |
| course | String | 2-100 characters, required |

### Optional Fields

| Field | Format | Constraints |
|-------|--------|-------------|
| gpa | Number | 0-4.0, defaults to 0 |
| phoneNumber | String | 10 digits only |
| address | Object | Any structure |
| status | String | active, inactive, graduated, suspended |

## Error Handling

The API returns consistent error responses:

### Validation Error (400)

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

### Resource Not Found (404)

```json
{
  "error": "Student not found"
}
```

### Conflict Error (409)

```json
{
  "error": "Email or roll number already exists"
}
```

## Pagination

Use `page` and `limit` query parameters:

```bash
curl http://localhost:5000/api/students?page=2&limit=20
```

Response includes pagination metadata:

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

## Filtering & Sorting

### Filter by Course

```bash
curl http://localhost:5000/api/students?course=Computer%20Science
```

### Filter by Status

```bash
curl http://localhost:5000/api/students?status=active
```

### Sort by Field

```bash
curl http://localhost:5000/api/students?sortBy=-gpa
```

Use `-` prefix for descending order, omit for ascending.

## Advanced Features

### Get Statistics

```bash
curl http://localhost:5000/api/students/stats/overview
```

Returns:

```json
{
  "totalStudents": 150,
  "byStatus": {
    "active": 120,
    "inactive": 15,
    "graduated": 12
  },
  "byCourse": [
    {
      "_id": "Computer Science",
      "count": 45,
      "avgGpa": 3.75
    }
  ]
}
```

### Get Students by Course

```bash
curl http://localhost:5000/api/students/course/Computer%20Science?page=1&limit=15
```

## Performance Considerations

- **Indexing**: Database indexes on email, rollNumber, and course for faster queries
- **Pagination**: Always use pagination for large datasets
- **Filtering**: Pre-filter data to reduce payload size

## Security Best Practices

- ✅ Input validation on all endpoints
- ✅ Unique constraints on email and roll number
- ✅ Centralized error handling
- ✅ CORS enabled for frontend integration
- ⚠️ **TODO for Production**: Implement JWT authentication
- ⚠️ **TODO for Production**: Add rate limiting
- ⚠️ **TODO for Production**: Implement HTTPS

## Deployment

### To Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### To Heroku

```bash
heroku create your-app-name
heroku config:set MONGODB_URI="your-mongodb-uri"
git push heroku main
```

### To AWS/Google Cloud/Azure

Follow their respective Node.js deployment guides and set environment variables.

## Troubleshooting

### MongoDB Connection Failed

- Verify MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use

```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# For Windows
netstat -ano | findstr :5000
taskkill /PID {PID} /F
```

### CORS Errors

- Ensure CORS is enabled in `server.js` (it is by default)
- Configure allowed origins if needed

## Future Enhancements

- [ ] JWT Authentication
- [ ] Role-based access control
- [ ] Advanced search across all fields
- [ ] Export to CSV/PDF
- [ ] File uploads for student photos
- [ ] Email notifications
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Request rate limiting
- [ ] Logging and monitoring

## API Documentation

For complete API documentation with examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Contributing

Feel free to submit pull requests or report issues.

## License

ISC

## Support

For questions or issues:
1. Check the [API Documentation](./API_DOCUMENTATION.md)
2. Review error messages and validation rules
3. Test with Postman collection first

---

**Last Updated:** January 13, 2024  
**Version:** 1.0.0
