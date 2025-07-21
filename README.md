DriverMaster (FleetManagerPro)
🛠 Introduction
DriverMaster is a fullstack logistics and fleet management application designed to streamline vehicle tracking, maintenance scheduling, driver performance monitoring, and route planning. This project empowers fleet managers and drivers with a centralized system to efficiently manage operations, track data, and optimize logistics.

🚀 Project Type
Fullstack (MERN Stack)

🌐 Deployed App
Frontend: https://drivermaster-frontend.vercel.app

Backend: https://drivermaster-api.onrender.com

Database: MongoDB Atlas (secured and cloud-hosted)

📁 Directory Structure
pgsql
Copy
Edit
DriverMaster/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.js
│   └── tailwind.config.js
🎬 Video Walkthroughs
Feature Walkthrough: Watch (2-min demo)

Codebase Overview: Watch (5-min walkthrough)

✨ Features
🔐 User Authentication with Roles (Admin, Manager, Driver)

📍 Vehicle Tracking with Leaflet Map (manual updates)

🛠 Maintenance Scheduling (calendar-based with history)

⛽ Fuel Entry Logging per Vehicle

🧑‍✈️ Driver Dashboard

📊 Dashboard Insights for managers

📦 Clean, responsive UI with Tailwind CSS

🔧 Design Decisions / Assumptions
Role-based access control (RBAC) simplifies dashboard routing

Simulated map data instead of real GPS for faster testing

MongoDB stores all entity data including vehicle info, maintenance, fuel logs

Auth tokens stored in localStorage

React-Router DOM handles navigation logic

Axios used with JWT bearer token for secure API calls

🚦 Installation & Getting Started
Prerequisites
Node.js

MongoDB Atlas account

Postman (for backend testing)

bash
Copy
Edit
# Clone the repository
git clone https://github.com/yourusername/DriverMaster.git
cd DriverMaster

# Install backend
cd backend
npm install
npm start

# Install frontend
cd ../frontend
npm install
npm start
🔐 Credentials
Role	Email	Password
Admin	admin@example.com	admin123
Manager	manager@example.com	manager123
Driver	driver@example.com	driver123
Admin   whyrush711@gmail.com    whyrush711

🧪 API Endpoints (Backend)
Base URL: http://localhost:3000/api

Auth
POST /auth/signup — Create a new user

POST /auth/login — Login and receive JWT

POST /auth/forgot-password — Send reset token

POST /auth/reset-password/:token — Reset password

Vehicles
GET /vehicles — Get all vehicles

POST /vehicles — Add a new vehicle

PUT /vehicles/:id — Update vehicle

DELETE /vehicles/:id — Delete vehicle

Maintenance
POST /maintenance/addMaintenance — Add maintenance task

GET /maintenance/:vehicleId — Get maintenance history

PUT /maintenance/:id/complete — Mark maintenance completed

Fuel
POST /fuel/:vehicleId — Add fuel entry

GET /fuel/:vehicleId — Get fuel history

🧰 Tech Stack
💻 Frontend: React.js, Tailwind CSS, React-Router-DOM, Axios

🧠 Backend: Node.js, Express.js

🛢 Database: MongoDB Atlas

🔐 Auth: JWT, Bcrypt.js, Nodemailer

🗺 Map: Leaflet.js (for route planning/tracking)