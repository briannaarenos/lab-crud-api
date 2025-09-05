# lab-crud-api

- A simple CRUD (Create, Read, Update, Delete) API built with **Node.js**, **Express**, and **MySQL**.  
- This project demonstrates how to set up a RESTful API with a structured project layout, environment variables, and database integration.  
Currently supports **students** and **courses** resources.

---

## Project Overview
- **Backend Framework:** Express.js  
- **Database:** MySQL (via XAMPP or MySQL CLI)  
- **Environment Config:** dotenv  
- **Hot Reloading:** nodemon (for development)  
- **Features:**
  - Health check endpoint (`/api/health`)
  - CRUD for `students` table
  - CRUD for `courses` table
  - CORS enabled for frontend integration

---

## Setup Steps

1. **Clone the Repository**
   - git clone https://github.com/<your-username>/lab-crud-api.git
   - cd lab-crud-api
2. **Install Dependencies**
  - npm install
3. **Environment Variables**
  - Create a .env file in the root directory:
  
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=
  DB_NAME=lab_crud
  PORT=3000

  Or copy .env.example and fill in your values.

4. **Database Setup**
- Start MySQL (via XAMPP or CLI).
- Create the database and tables:

  CREATE DATABASE lab_crud;
  
  CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    course VARCHAR(100),
    year_level INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    units INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

## HOW TO RUN
 -  npm run dev
  
 - Server should be running at http://localhost:3000

## API Endpoints
Health Check:
  - GET /api/health

Students:
  - GET /api/students → Get all students
  - GET /api/students/:id → Get student by ID
  - POST /api/students → Create new student
  - Body: { "name": "John Doe", "email": "john@example.com", "course": "BSCS", "year_level": 2 }
  - PUT /api/students/:id → Update student
  - DELETE /api/students/:id → Delete student

Courses:
  - GET /api/courses → Get all courses
  - GET /api/courses/:id → Get course by ID
  - POST /api/courses → Create new course
  - Body: { "code": "CS101", "title": "Intro to CS", "units": 3 }
  - PUT /api/courses/:id → Update course
  - DELETE /api/courses/:id → Delete course

## NOTES
- Never commit your real .env.
- Use .env.example for placeholders.
