# Full Stack Next.js Login and Signup Form

Welcome to the Full Stack Next.js Login and Signup Form project repository! This project showcases a production-level application for user authentication featuring login, signup, forgot password, email verification, user deletion, and logout functionalities.

## Project Overview

This project was developed to demonstrate a robust authentication system using Next.js, incorporating various features essential for user management and security.

## Features

### Frontend:

- **User Authentication**: Implement secure login and signup functionalities.
- **Forgot Password**: Allow users to reset their passwords via email.
- **Email Verification**: Ensure user authenticity through email verification.
- **User Deletion**: Allow users to delete their accounts if needed.
- **Logout Functionality**: Provide users with the ability to log out securely.
- **Tailwind CSS and Material-UI (MUI)**: Create an aesthetically pleasing and user-friendly UI.
- **Next.js Routing**: Utilize Next.js routing for seamless navigation between pages.

### Backend:

- **Mongoose**: Utilize MongoDB with Mongoose for storing user data.
- **jsonwebtoken (JWT)**: Securely store authentication tokens in cookies for seamless user login across sessions.
- **bcryptjs**: Employ bcrypt for token encryption and user verification.
- **Axios**: Handle API calls for communication between frontend and backend.
- **Mailtrap Integration**: Integrate Mailtrap for receiving and managing emails related to user authentication processes.

## Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS, Material-UI (MUI), TypeScript
- **Backend**: Node.js, MongoDB, Mongoose 
- **Authentication**: jsonwebtoken (JWT), bcryptjs
- **Other**: Axios, nodemailer, Mariltrap

## Screenshots

![App preview](https://private-user-images.githubusercontent.com/110533554/306052769-6e9c4ad6-18d0-4239-96f7-4e34d7d02810.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDgzNjk0NTgsIm5iZiI6MTcwODM2OTE1OCwicGF0aCI6Ii8xMTA1MzM1NTQvMzA2MDUyNzY5LTZlOWM0YWQ2LTE4ZDAtNDIzOS05NmY3LTRlMzRkN2QwMjgxMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIxOVQxODU5MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05NGU4YmM1NTA2MGMxYzdlMjlmZjBlNzViZWIxYjJiMzRlYmYyNDBiZTUxNDRhZjhhNGY3NzRmMDJmMWIwZmJjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.m_MxkUROB8PQJd603NKwfydA_68f1fdViLlweXb8K0c)

![App preview](https://private-user-images.githubusercontent.com/110533554/306052780-d794faba-8777-438c-8334-0b15f78417bb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDgzNjk0NTgsIm5iZiI6MTcwODM2OTE1OCwicGF0aCI6Ii8xMTA1MzM1NTQvMzA2MDUyNzgwLWQ3OTRmYWJhLTg3NzctNDM4Yy04MzM0LTBiMTVmNzg0MTdiYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMjE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDIxOVQxODU5MThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMDlhNTA3YTYzMDJmYjZlY2E4M2Q4NmMxZTA3MThhOTIxZGUyMjk1MTlmMGE2YWNlYmZkNWY3YzgyYmVhZDUzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.JqRKJ1rA7mEp9Es_Z7t0lnx_6zGJc4UGpBY3OLOTInw)

## Demo

Check out the live demo of the Full Stack Next.js Login and Signup Form - https://cksabari2001-signup-login-nextjs.vercel.app

## Configuration

Before running the application, ensure you have set up the necessary environment variables in the `.env` file. Follow the steps below:

1. Create a `.env` file in the root directory of the project if it doesn't already exist.

2. Add the following environment variables to the `.env` file:

- `MONGO_URI`: Replace `YOUR_MONGO_URI_HERE` with your MongoDB connection string. This should include your username, password, and the name of your MongoDB cluster.

- `TOKEN_SECRET`: Replace `YOUR_TOKEN_SECRET_HERE` with a secret key for JWT token encryption.

- `DOMAIN`: Replace `YOUR_DOMAIN_HERE` with the domain of your application. This will typically be `http://localhost:3000` for local development.

- `MAILTRAP_USERNAME` and `MAILTRAP_PASSWORD`: Replace `YOUR_MAILTRAP_USERNAME_HERE` and `YOUR_MAILTRAP_PASSWORD_HERE` with your Mailtrap username and password respectively. This is necessary for email testing and verification during development.

3. Save the `.env` file.

Now you're all set to run the application with the updated environment variables.

## Run Locally

### 1. Clone this repository to your local machine

```bash
  git clone https://github.com/CKsabari2001/signup-login-nextjs
```

### 2. Install dependencies

```bash
  npm install
```

### 3. Start the development server

```bash
  npm run dev
```
