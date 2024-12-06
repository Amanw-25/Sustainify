# Sustainify 

This is a **Sustainify** built with **Node.js**, **Express**, and **MongoDB**. It includes user registration, login, password hashing, JWT-based access/refresh tokens for authentication, and the ability to calculate and track a user's carbon footprint based on their consumption patterns. Additionally, it integrates with the **Mistral AI API** for enhanced carbon footprint analysis.

## Features

- **User Registration**: Create a new account with a unique username, email, and password.
- **Password Hashing**: Passwords are securely hashed using `bcrypt` before storing in the database.
- **JWT-based Authentication**: Provides both access tokens and refresh tokens to manage user sessions.
- **Carbon Footprint Calculation**: Calculates a user's carbon footprint based on their consumption data (e.g., petrol, electricity, flights, etc.).
- **Track Carbon Footprint**: Stores the user's carbon footprint and provides recommendations for reducing emissions.
- **Role-Based Access**: Allows user roles (e.g., admin, user) for role-based permissions.
- **Profile Photo**: Optionally upload a profile photo.
- **Mistral API Integration**: Utilizes the **Mistral API** for detailed and personalized carbon footprint analysis and recommendations.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Library to hash and compare passwords.
- **Mistral API**: For providing enhanced analysis of carbon footprint.
- **Nodemailer**: Email for communication (future scope).

## API Endpoints

### User Registration

- **Endpoint**: `POST http://localhost:5130/api/v1/sustainify/auth/signup`
- **Description**: Registers a new user with a username, email, and password.
- **Request Body**:
  ```json
  {
  "username": "Aman Wairagkar",
  "phonenumber": "87705250XX",
  "email": "test1@gmail.com",
  "password": "123"
  }

  ```
- **Success Response**:
  ```json
  {
    "status": "success",
    "message": "Registeration successfull !",
    "user": {
        "_id": "6752ca81c6c21f71016530b4",
        "username": "aman wairagkar",
        "email": "test1@gmail.com",
        "isEmailVerified": false,
        "roles": [
            "user"
        ],
        "profilePhoto": null
    }
  }
  ```

### User Login

- **Endpoint**: `POST http://localhost:5130/api/v1/sustainify/auth/login`
- **Description**: Logs in a user with email and password.
- **Request Body**:
  ```json
  {
    "email":"test1@gmail.com",
    "password":"123"
    
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

### Calculate Carbon Footprint

- **Endpoint**: `POST http://localhost:5130/api/v1/sustainify/carbon/calculate-carbon-footprint`
- **Description**: Calculates the carbon footprint based on the user's consumption data (e.g., petrol, electricity, flights, etc.). Also integrates with Mistral API to analyze and provide recommendations.
- **Request Body**:
  ```json
  {
  "Petrol": 0,
  "Diesel": 0,
  "Electricity": 15,
  "NaturalGas": 0,
  "CNG": 0,
  "Flight":0 ,
  "LPG": 0,
  "FuelOil": 0,
  "Coal": 0,
  "OrganicWaste": 12000,
  "PaperWaste": 8000,
  "PlasticWaste": 50000,
  "WaterUsage": 20000000,
  "PublicTransportUsage": {
    "Bus": 500,
    "Train": 30,
    "Metro": 20
  }
  }

  ```

- **Success Response**:
  ```json
  {
    "message": "Carbon footprint calculated and saved successfully",
    "carbonFootprint": {
        "user": "675299776d3d69e598f8c272",
        "Petrol": 0,
        "Diesel": 0,
        "Electricity": 10.697999999999999,
        "NaturalGas": 0,
        "CNG": 0,
        "Flight": 0,
        "LPG": 0,
        "FuelOil": 0,
        "Coal": 0,
        "OrganicWaste": 3000,
        "PaperWaste": 11680,
        "PlasticWaste": 300000,
        "WaterUsage": 5999.999999999999,
        "PublicTransportUsage": {
            "Bus": 51,
            "Train": 1.23,
            "Metro": 0.96
        },
        "Total": 320743.888,
        "_id": "6752c8449aacfdc8bc3848fb",
        "createdAt": "2024-12-06T09:47:48.734Z",
        "updatedAt": "2024-12-06T09:47:48.734Z",
        "__v": 0
    },
  }
  ```
## Mistral API Integration

This API integrates with **Mistral AI** to provide personalized analysis and recommendations for reducing the carbon footprint. The Mistral API is used to further analyze the data and provide actionable insights.

### Mistral Endpoint:

- **EndPoint**: `POST http://localhost:5130/api/v1/sustainify/mistral/chat`
- **Description**: Get a detail Tip based on the user's consumption data (e.g., petrol, electricity, flights, etc.). Based on the data store in user Schema.
- **Request Body**:
  ``` 
  Keep it EMPTY
  ```

- **Success Response**:
  ```json
  {
    "summary": "Mistral AI Response:",
    "tips": [
        "Thank you for taking the first step towards understanding and reducing your carbon footprint! Let's dive into the analysis of your one-month carbon data.",
        "",
        "1. Key Insights:",
        "Your overall carbon footprint is dominated by paper waste and plastic waste, contributing significantly to emissions. Here's a breakdown:",
        "   - Electricity Consumption: 10.6979 kWh/month (moderate)",
        "   - Organic Waste: 3000 kg/month (typical)",
        "   - Paper Waste: 11680 kg/month (extremely high)",
        "   - Plastic Waste: 300000 kg/month (exceptionally high)",
        "   - Water Usage: 5999.99 liters/month (moderate)",
        "",
        "2. Actionable Tips:",
        "   a. Reduce paper waste by switching to digital bills, statements, and subscriptions.",
        "   b. Reuse paper waste as packing material and recycle it afterward.",
        "   c. Replace single-use plastic items with reusable alternatives.",
        "   d. Purchase in bulk to minimize packaging waste; opt for refillable containers.",
        "   e. Start composting organic waste to reduce landfill methane emissions.",
        "",
        "3. Main Contributor Analysis:",
        "Paper and plastic waste contribute the most to your carbon footprint. This is significant because:",
        "   - Paper production leads to deforestation, impacting biodiversity and CO2 absorption.",
        "   - Plastic waste takes hundreds of years to decompose, polluting ecosystems and releasing harmful greenhouse gases.",
        "",
        "To address this, consider waste reduction strategies such as using reusable shopping bags, avoiding excessive packaging, and repurposing waste.",
        "",
        "4. Precautionary Measures:",
        "   - Regularly monitor your carbon footprint to identify areas for improvement.",
        "   - Educate yourself and your community about sustainable practices.",
        "   - Support businesses that prioritize eco-friendly practices and products.",
        "   - Advocate for policies that encourage waste reduction and recycling.",
        "",
        "5. Comparison with Benchmarks:",
        "Your electricity consumption is in line with the average for developed countries, while water usage is slightly higher. However, paper and plastic waste are significantly above average, emphasizing the need for reduction.",
        "",
        "In conclusion, focusing on reducing paper and plastic waste can significantly decrease your carbon footprint. Remember, every small change matters. By adopting sustainable practices, you're contributing to a healthier planet for future generations. Keep up the great work, and let's continue to make a difference together!"
    ]
  }
  ```
