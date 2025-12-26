import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./services/db.js";
import stocksRouter from "./routes/stocks.js";
import portfolioRouter from "./routes/portfolio.js";
import healthRouter from "./routes/health.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/portfolio", portfolioRouter);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Stock Dashboard API" });
});

async function start() {
  try {
    await pool.connect();
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();






