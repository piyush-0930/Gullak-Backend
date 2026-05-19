# Gullak Backend API

[![Live API](https://img.shields.io/badge/Live%20API-Online-green)](https://gullak-backend-api.onrender.com/)
[![Swagger Docs](https://img.shields.io/badge/Swagger-Documentation-brightgreen)](https://gullak-backend-api.onrender.com/api-docs)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/piyush-0930/Gullak-Backend)

Professional backend API for Gullak Expense Tracker Application built using Node.js, Express.js, MongoDB, and JWT Authentication.  
This API provides secure authentication, transaction management, category management, analytics, filtering, pagination, and Swagger API documentation.

---

# Features

- User Authentication & Authorization
- JWT Based Secure Authentication
- Password Hashing using bcryptjs
- Transactions CRUD Operations
- Categories Management
- Analytics Dashboard APIs
- Filtering, Sorting & Pagination
- Swagger API Documentation
- Global Error Handling
- Input Validation
- Rate Limiting
- Security Middleware
- MongoDB Aggregation Pipelines
- Production Ready Architecture

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Swagger Documentation
- Express Validator
- bcryptjs

---

# Project Structure

```bash
src/
├── config/
├── controllers/
├── docs/
├── middleware/
├── models/
├── routes/
├── utils/
├── validations/
└── app.js
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/piyush-0930/Gullak-Backend.git
```

Move into project directory:

```bash
cd Gullak-Backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

NODE_ENV=development
```

---

# Run Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

# Swagger API Documentation

After starting the server:

```bash
http://localhost:5000/api-docs
```

---

# Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Rate Limiting
- MongoDB Sanitization
- XSS Protection
- Helmet Security Headers
- HTTP Parameter Pollution Protection

---

# API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current logged in user |

---

## Transaction Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/transactions | Create transaction |
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions/:id | Get single transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |

---

## Transaction Query Parameters

### Filtering

```bash
/api/transactions?type=expense
/api/transactions?category=Food
/api/transactions?startDate=2026-01-01&endDate=2026-12-31
```

### Sorting

```bash
/api/transactions?sortBy=amount&order=asc
/api/transactions?sortBy=date&order=desc
```

### Pagination

```bash
/api/transactions?page=1&limit=10
```

---

## Category Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

---

## Analytics Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/analytics/overview | Get overall analytics |
| GET | /api/analytics/categories | Get category breakdown |
| GET | /api/analytics/monthly | Get monthly summary |

---

# Example Request

## Register User

### Endpoint

```bash
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Piyush",
  "email": "piyush@gmail.com",
  "password": "123456"
}
```

---

# Example Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "123456789",
    "name": "Piyush",
    "email": "piyush@gmail.com",
    "token": "jwt_token"
  }
}
```

---

# Analytics Features

- Total Income
- Total Expenses
- Net Balance
- Expense Category Breakdown
- Monthly Income & Expense Summary

---

# Default Categories

The API automatically seeds default categories:

- Food
- Transport
- Shopping
- Bills
- Health
- Salary
- Freelancing

---

# Deployment

This project can be deployed on:

- Render
- Railway
- Fly.io

---

# Render Deployment

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Environment Variables Required:

```env
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

---

# Live Project

## Live API

https://gullak-backend-api.onrender.com/

## Swagger API Documentation

https://gullak-backend-api.onrender.com/api-docs

## GitHub Repository

https://github.com/piyush-0930/Gullak-Backend

---

# Future Improvements

- Refresh Token Authentication
- Unit & Integration Testing
- Docker Support
- Email Verification
- Budget Management
- Export Reports

---

# Author

Piyush Aggarwal

LinkedIn:
https://www.linkedin.com/in/piyushaggarwal30