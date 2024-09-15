# Store Data Report Application

## Overview

This React app helps you view product data and see who spends the most. It gets data from a backend server, which pulls information from a MongoDB database and calculates spending insights.

## Features

- **Generate Report**: Fetches and displays product data including product name, customer name, quantity, price, and total.
- **Top Purchasers**: Retrieves and displays top purchasers based on the total amount spent.
- **Reset**: Clears all data and resets the state of the application.

## Technologies Used

- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **APIs**: External API for product data, custom API endpoints for data retrieval

## Prerequisites

Before running this application, ensure you have the following installed:

1. **Node.js** (version 14.x or later)
2. **MongoDB Atlas** account (for the database)
3. **.env** file with MongoDB credentials

## Getting Started

### Backend

1. **Setup MongoDB**

   Ensure MongoDB is running and accessible. Update your MongoDB URI in the backend code if necessary.

2. **Backend Code**

   - Ensure you have the backend code running at `https://users-management-server-zeta.vercel.app`.
   - The backend API endpoints used by this frontend are:
     - `/fetch-and-store` - Endpoint to fetch and store product data.
     - `/top-purchasers` - Endpoint to get the top purchasers and related statistics.

### Frontend

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
      ```
      npm install
      # or
      yarn install
   ```
3. **Configure Environment Variables**
   - Create a .env file in the backend folder and add your MongoDB credentials:
   ```
      USER_NAME=your-mongodb-username
      USER_PASS=your-mongodb-password
   ```
4. **Run the Application**
   ```
      npm start
      # or
      yarn start
   ```

### Host Link : ( https://store-data-report.netlify.app/ )
