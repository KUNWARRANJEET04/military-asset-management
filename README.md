# 🛡 Military Asset Management System

A secure, role-based military asset management platform built using **React**, **Node.js (Express)**, and **PostgreSQL**. It tracks weapons, vehicles, ammunition, purchases, transfers, assignments, and provides dashboard visualizations.

---

## 🚀 Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `frontend` directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build.

---

## 📦 Backend Setup (Express.js)

In the `backend` directory:

### `.env`

```env
PORT=4000
DATABASE_URL=postgres://your_username:your_password@localhost:5432/military_db
JWT_SECRET=supersecretmilitarykey


Install & Run
bash
Copy code
cd backend
npm install
npx sequelize db:migrate
node scripts/seedUser.js   # Optional: seeds admin user
npm start
Server will run at http://localhost:4000

🖥️ Frontend Setup (React.js)
bash
Copy code
cd frontend
npm install
npm start
Open http://localhost:3000

🗂 Folder Structure
bash
Copy code
military-asset-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
├── .env
├── README.md
👥 Roles & Login
Default Admin:
bash
Copy code
Email: admin@example.com
Password: admin123
📊 Features
Login/Signup with JWT

Admin, Commander, and Operator Roles

Dashboard with:

Opening/Closing Balance

Purchases/Transfers/Assignments

Charts (Pie + Bar)

Excel Export

Asset Filters (by base & type)

Navbar Navigation

Forgot Password (UI only)

📁 Deployment Notes
Frontend: Deploy on Vercel, Netlify, or Render

Backend: Deploy on Render, Railway, or Heroku

Set up environment variables on platform

Ignore node_modules, .cache, .env, and build folders

👨‍💻 Author
Kunwar Ranjeet
🔗 GitHub
🔗 Google Scholar
📫 Contact: kunwarranjeet2003@gmail.com
