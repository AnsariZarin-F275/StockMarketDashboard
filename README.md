📈 Stock Market Dashboard

A full-stack demo application for monitoring stocks, managing a simulated trading portfolio, and working with PostgreSQL using pgAdmin.

This project is built to demonstrate how a real-world stock dashboard works, including trade simulation, portfolio tracking, notifications, and basic analytics — all in a safe, risk-free environment.

🛠 Tech Stack

Frontend: React + Vite (HTML, CSS, JavaScript)

Backend: Node.js + Express

Database: PostgreSQL (managed using pgAdmin)

Charts: Recharts

🚀 Quick Start (No Docker)
1. Database Setup (pgAdmin)

Create a PostgreSQL database named stockdash.

Open the pgAdmin Query Tool and run the file
backend/src/schema.sql once.

This will create the following tables:

users

trades

watchlist

notifications

2. Backend Setup

Copy the example environment file:

backend/env.example → backend/.env


Update DATABASE_URL if your PostgreSQL username or password is different.

From the backend folder, run:

npm install
npm run dev


The backend API will start on:
👉 http://localhost:4000

3. Frontend Setup

From the frontend folder, run:

npm install
npm run dev


The React application will start on:
👉 http://localhost:5173

API requests are proxied to:
👉 http://localhost:4000/api

🔗 API Routes (Summary)

GET /api/health – Server and database health check

GET /api/stocks/quote/:symbol – Fetch stock quote (returns mock data if no API key)

GET /api/stocks/search?q= – Search stock symbols (mocked if no API key)

GET /api/portfolio/holdings – Aggregated portfolio holdings

GET /api/portfolio/performance – Basic profit/loss statistics

GET /api/portfolio/watchlist – Fetch watchlist

POST /api/portfolio/watchlist – Add to watchlist { symbol, note }

POST /api/portfolio/trade – Record a trade { symbol, side, quantity, price }
(Automatically creates a notification)

GET /api/portfolio/notifications – View recent notifications

POST /api/portfolio/notifications/:id/read – Mark notification as read

✨ Features to Mention in Presentation

Stock market dashboard with a simulated portfolio value chart

Trade simulator for buy and sell operations

Portfolio table with calculated value and performance metrics

Watchlist with live stock search and personal notes

Real-time style notifications for every recorded trade

“Learn the Basics” section with simple stock market explanations and external resources

📝 Notes

If database credentials change, ensure DATABASE_URL in .env stays updated.

Live stock data requires a valid MARKET_API_KEY.

If no API key is provided, the application automatically falls back to mock data.