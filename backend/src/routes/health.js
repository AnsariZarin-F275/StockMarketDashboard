import { Router } from "express"; 
import { query } from "../services/db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});
  
export default router;






