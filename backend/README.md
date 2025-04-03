# VIT Mess Manager Backend

This is the backend server for the VIT Mess Manager application. It provides RESTful APIs for managing student registrations and mess preferences.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vit-mess-manager
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Students

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a single student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Data Models

### Student

```javascript
{
  regNo: String,      // Registration number (e.g., 2023CS0001)
  name: String,       // Full name
  block: String,      // Block letter (A-Z)
  roomNumber: String, // 3-digit room number
  mess: String,       // Selected mess
  messType: String,   // Mess type (Veg/Non-Veg/Special/Night mess)
  createdAt: Date     // Registration date
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Development

- The server uses Express.js for routing and middleware
- MongoDB with Mongoose for database operations
- CORS enabled for frontend integration
- Input validation using Mongoose schemas
- Error handling middleware for consistent error responses

## Production

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB instance
3. Set up proper CORS configuration
4. Enable rate limiting and security middleware
5. Use HTTPS
6. Set up proper logging and monitoring 