import { Router } from "express";
import { fetchQuote, searchTicker } from "../services/marketData.js";

const router = Router();

router.get("/quote/:symbol", async (req, res) => {
  try {
    const quote = await fetchQuote(req.params.symbol);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Query required" });
  try {
    const results = await searchTicker(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;






