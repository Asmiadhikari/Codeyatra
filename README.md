# Codeyatra
# Anna Maitri - Food Donation App

## Overview
Anna Maitri is a food donation application designed to connect donors with those in need. The platform allows donors to sign in, log in, and contribute food items, making the process of food distribution more efficient and impactful.

## Features
- **User Authentication**: Secure sign-in and login system for donors.
- **Food Donation**: Donors can contribute surplus food to be distributed to the needy.
- **Dashboard**: A user-friendly interface to manage donations and track contributions.
- **Location-Based Matching**: Helps connect donors with nearby recipients for efficient food distribution.
- **Real-Time Updates**: Keeps donors informed about the status of their donations.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Asmiadhikari/Codeyatra.git
   ```
2. Navigate to the project directory:
   ```bash
   cd codeyatra
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the backend server:
   ```bash
   cd Hack_Back
   npm run dev
   ```
6. Navigate to the frontend directory and start the React app:
   ```bash
   cd Hack_Front
   npm run dev
   ```


