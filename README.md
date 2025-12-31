# mini project user management system

Project Overview & Purpose
The MERN Stack Mini User Management Application is a full-stack web application designed to manage users efficiently through a simple and secure interface. The application demonstrates the practical implementation of the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows real-world development practices.
The primary purpose of this project is to:
•	Understand full-stack application architecture
•	Implement user authentication and authorization
•	Perform CRUD operations on user data
•	Learn REST API integration between frontend and backend
•	Gain hands-on experience with deployment and environment configuration

 Key Features
•	User Registration & Login
•	JWT-based Authentication
•	Protected Routes (Admin/User access)
•	Create, Read, Update, Delete (CRUD) Users
•	Secure Password Hashing
•	Responsive UI using React
•	API integration with Express & Node
•	MongoDB database connection
 Tech Stack Used
•	Frontend: React.js (Vite), Tailwind CSS
•	Backend: Node.js, Express.js
•	Database: MongoDB (MongoDB Atlas)
•	Authentication: JSON Web Token (JWT)
•	Deployment: Render (Backend), Vercel (Frontend)

Setup Steps
1.	Clone the Repository
git clone https://github.com/jishnupm-68/miniUserManagementSystem.git
cd mini-user-management
2.	 Backend Setup
cd backend
npm install
Create a .env file inside the backend folder and add:
PORT=5000
DB_CONNECTION_URL 
=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_VALIDATOR = ADMIN / your_admin_secret
BCRYPT_SECRET = 10
CORS_ORIGIN_URL = http://localhost:5173 
CORS_ORIGIN_URL_PRODUCTION =your cors origin url
Start the backend server:
npm run dev
Backend will run at:
http://localhost:5000

3.	Frontend Setup
cd frontend
npm install
Create a .env file inside the frontend folder:
VITE_API_BASE_URL =http://localhost:5000 or your production url
Start the frontend application:
npm run dev
Frontend will run at:
http://localhost:5173
4.	Database Setup (MongoDB Atlas)
a.	Create a MongoDB Atlas account
b.	Create a new cluster
c.	Get the connection string
d.	Add the connection string to the backend .env file
e.	Whitelist your IP or allow access from anywhere
5.	Run the Application
•	Start Backend → npm run dev
•	Start Frontend → npm run dev
•	Open browser and access the frontend URL
Purpose of This Project
•	To showcase end-to-end MERN development
•	To practice secure authentication
•	To understand frontend–backend communication
•	To prepare for real-world full-stack interviews
•	To serve as a base for advanced features like roles, permissions, and dashboards
API Documentation : POSTMAN collection Link :
https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fworkspace%2Fjishnu%7Ed43e9c76-ee62-423c-b142-baf634ed5809%2Fcollection%2F39409528-28dc57a3-e439-41fe-b260-6b20bd4bfcee%3Faction%3Dshare%26source%3Dcopy-link%26creator%3D39409528&intent=switch-account&target_team=crimson-comet-114560&authFlowId=6c0b4fe7-10f7-4494-ace0-89dda871198a

API Documentation
 Base URL
Development :  http://localhost:5000
Production :  https://your-backend-name.onrender.com
Authentication & Authorization
•	Authentication is handled using JWT tokens
•	Token is stored in cookies
•	Protected routes use middleware:
o	userAuth → for logged-in users
o	adminAuth → for admin-only access

Account Routes
 Signup
POST /signup
Creates a new user account.
Request Body
{
  "email": "user@example.com",
  "password": "Strong@123",
  "fullName": "John Doe",
  "role": "user | admin",
  "status": "active",
  "adminValidator": "ADMIN_SECRET_KEY"
}
Validations
•	Email must be valid
•	Password must be strong (uppercase, lowercase, number, special character)
•	Admin role requires a valid adminValidator secret
•	Email must be unique
Success Response (201)
{
  "status": true,
  "message": "Account created successfully",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active"
  }
}
Error Responses
•	400 → Missing fields / weak password
•	401 → Invalid admin secret key
•	409 → Email already registered
•	500 → Server error
 Login
POST /login
Authenticates an existing user.
Request Body
{
  "email": "user@example.com",
  "password": "Strong@123"
}
Success Response (200)
{
  "status": true,
  "message": "Login success",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active"
  }
}
JWT token is set in cookies on successful login.
Error Responses
•	400 → Missing inputs / inactive account
•	401 → Invalid credentials
•	404 → Email not registered
•	500 → Server error

 Logout
POST /logout
Logs out the user by clearing the authentication cookie.
Success Response (200)
{
  "status": true,
  "message": "Logged out successfully"
}

 User Routes (Protected)
Requires user authentication (userAuth)

 Get Logged-in User Data
GET /user/getData
Success Response (200)
{
  "status": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "status": "active",
    "lastLogin": "2025-01-01T10:00:00Z"
  }
}

 Edit User Profile
PATCH /user/editUserData
Request Body
{
  "email": "newemail@example.com",
  "fullName": "Updated Name"
}
Validations
•	Email must be unique
•	Cannot update another user's email
Success Response (200)
{
  "status": true,
  "message": "User data updated successfully",
  "data": {
    "_id": "user_id",
    "email": "newemail@example.com",
    "fullName": "Updated Name"
  }
}
Error Responses
•	409 → Email already exists
•	400 → Update failed
•	500 → Server error

 Change User Password
PATCH /user/editPassword
Request Body
{
  "password": "NewStrong@123"
}
Validations
•	Password must be strong
Success Response (200)
{
  "status": true,
  "message": "Password successfully updated"
}
Error Responses
•	400 → Weak password
•	500 → Server error

 Admin Routes (Protected)
Requires admin authentication (adminAuth)

 Get All User Data (Admin)
GET /admin/getData
Success Response (200)
{
  "status": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active"
    }
  ]
}

Update User Status (Admin)
PATCH /admin/editStatus
Request Body
{
  "userId": "user_id",
  "status": "active | inactive"
}
Success Response (200)
{
  "status": true,
  "message": "User status updated successfully"
}

 Cookie Details
•	JWT token stored as: token=<JWT_TOKEN>
•	Accessible on frontend (httpOnly: false)
•	Cleared on logout

Github Repository Link: https://github.com/jishnupm68/miniUserManagementSystem

Deployment Instructions
The MERN Stack Mini User Management Application is deployed using separate platforms for frontend and backend, following industry best practices.
•	Frontend: Vercel
•	Backend: Render
•	Database: MongoDB Atlas (Cloud)
Backend Deployment (Render)
Platform Used
•	Render – Cloud platform for deploying Node.js applications
Deployment Steps
1.	Prepare the Backend
o	Ensured index.js is the entry point
o	Added proper CORS configuration
o	Verified environment variables usage via process.env
2.	Push Code to GitHub
o	Backend code pushed to a GitHub repository
o	.env file excluded using .gitignore
3.	Create Render Web Service
o	Logged into Render
o	Selected New → Web Service
o	Connected the GitHub repository
o	Chose the backend folder (if monorepo)
4.	Configure Build & Start Commands
5.	npm install
6.	npm start
7.	Set Environment Variables in Render
8.	Deploy
o	Render automatically built and deployed the backend
o	Generated a public backend URL
Example:
https://your-backend-name.onrender.com

Frontend Deployment (Vercel)
Platform Used
•	Vercel – Optimized for React and Vite applications
Deployment Steps
1.	Prepare the Frontend
o	Used Vite for building the React application
o	Ensured API base URL is read from environment variables
2.	Set Environment Variable
3.	VITE_API_URL=https://your-backend-name.onrender.com
4.	Push Code to GitHub
o	Frontend code pushed to the same or separate repository
o	.env file excluded from version control
5.	Create Vercel Project
o	Logged into Vercel
o	Imported GitHub repository
o	Selected Vite as the framework preset
6.	Configure Build Settings
7.	Build Command: npm run build
8.	Output Directory: dist
9.	Deploy
o	Vercel built and deployed the frontend
o	Generated a live frontend URL
Example:
https://your-frontend-name.vercel.app

Database Deployment (MongoDB Atlas)
Platform Used
•	MongoDB Atlas – Cloud-hosted NoSQL database
Setup Steps
1.	Created a MongoDB Atlas cluster
2.	Created a database and collections
3.	Generated a connection string
4.	Allowed network access (IP whitelist)
5.	Added the connection string to Render environment variables
 Production Configuration Notes
•	Environment variables are managed securely on Render and Vercel
•	JWT authentication works across production and development
•	CORS configured to allow frontend domain
•	Cookies / tokens handled based on environment
 Deployment Result
•	Backend API successfully deployed and accessible publicly
•	Frontend application connected to live backend
•	Database hosted securely in the cloud
•	Application fully functional in production
