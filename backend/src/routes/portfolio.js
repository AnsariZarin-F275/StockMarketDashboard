import { Router } from "express";
import {
  getHoldings,
  addWatchItem,
  recordTrade,
  getPerformance,
  listWatchlist,
  listNotifications,
  markNotificationRead,
} from "../services/portfolioService.js";

const router = Router();

router.get("/holdings", async (_req, res) => {
  const holdings = await getHoldings();
  res.json(holdings);
});

router.get("/performance", async (_req, res) => {
  const data = await getPerformance();
  res.json(data);
});

router.get("/watchlist", async (_req, res) => {
  const items = await listWatchlist();
  res.json(items);
});

router.post("/watchlist", async (req, res) => {
  const { symbol, note } = req.body;
  if (!symbol) return res.status(400).json({ message: "Symbol required" });
  const item = await addWatchItem(symbol, note);
  res.status(201).json(item);
});

router.post("/trade", async (req, res) => {
  const { symbol, side, quantity, price } = req.body;
  if (!symbol || !side || !quantity || !price) {
    return res
      .status(400)
      .json({ message: "symbol, side, quantity, price required" });
  }
  const trade = await recordTrade({ symbol, side, quantity, price });
  res.status(201).json(trade);
});

router.get("/notifications", async (_req, res) => {
  const items = await listNotifications();
  res.json(items);
});

router.post("/notifications/:id/read", async (req, res) => {
  await markNotificationRead(req.params.id);
  res.status(204).end();
});

export default router;


