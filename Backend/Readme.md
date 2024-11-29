# Login API

This is a simple **Login and User Authentication API** built with **Node.js**, **Express**, and **MongoDB**. It includes user registration, login, password hashing, and JWT-based access/refresh tokens for authentication.

## Features

- **User Registration**: Create a new account with a unique username, email, and password.
- **Password Hashing**: Passwords are securely hashed using `bcrypt` before storing in the database.
- **JWT-based Authentication**: Provides both access tokens and refresh tokens to manage user sessions.
- **Email Verification**: Contains a field to check whether the user's email is verified (for potential future email verification workflows).
- **Role-Based Access**: Allows for user roles (e.g., admin, user) for role-based permissions.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database used to store user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Library to hash and compare passwords.

## API Endpoints

### User Registration

- **Endpoint**: `POST http://localhost:5130/api/v1/CII/auth/signup`
- **Description**: Registers a new user with username, email, and password.
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "johndoe@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }
  ```
- **Success Response**:
  ```json
  {
    "status": "success",
    "message": "Registration successful!",
    "user": {
      "_id": "1234567890",
      "username": "john_doe",
      "email": "johndoe@example.com",
      "isEmailVerified": false,
      "isAuthenticated": false,
      "roles": [
          "user"
      ],
      "profilePhoto": null
  }
  }
  ```

### User Login

- **Endpoint**: `POST http://localhost:5130/api/v1/CII/auth/login`
- **Description**: Logs in a user with email and password.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "Password123!"
  }
  ```
- **Success Response**:
  - **Status Code**: `200 OK`
  - **Headers**:
    - `Authorization: Bearer <access_token>`  (Access token)
    - `Refresh-Token: <refresh_token>` (Refresh token)

  - **Response Body**:
  ```json
  {
    "status": "success",
    "message": "Login successful!"
  }
  ```

## Models

### User Model

The `User` schema includes the following fields:

- `username`: String (required)
- `email`: String (required, unique)
- `password`: String (required)
- `isEmailVerified`: Boolean (default: `false`)
- `isAuthenticated`: Boolean (default: `false`)
- `roles`: Array of Strings (default: `['user']`)
- `profilePhoto`: String (optional)

### Password Hashing and Authentication

- The password is hashed using `bcrypt` before being saved in the database.
- Passwords can be compared using the `isPasswordCorrect` method.
- JWT tokens (access and refresh tokens) are generated using `jsonwebtoken`.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Login-API.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables for JWT keys, token expiry times, and MongoDB connection in a `.env` file:
   ```env
   ACCESS_TOKEN_KEY=youraccesstokenkey
   REFRESH_TOKEN_KEY=yourrefreshtokenkey
   ACCESS_TOKEN_EXP=15m
   REFRESH_TOKEN_EXP=7d
   DATABASE_URI=mongodb://localhost:27017/yourdbname
   PORT = your_port
   REACT_APP_BASE_URL = "http://localhost:5173"
   ```

4. Start the server:
   ```bash
   nodemon index.js
   ```

5. Use Postman or a similar tool to test the API using the above endpoints.

