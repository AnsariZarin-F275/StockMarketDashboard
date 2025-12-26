import { query } from "./db.js";
import { fetchQuote } from "./marketData.js";

export async function getHoldings() {
  const { rows } = await query(
    `SELECT symbol, SUM(quantity) AS qty, AVG(price) AS avg_price
     FROM trades
     GROUP BY symbol
     ORDER BY symbol`
  );
  const enriched = await Promise.all(
    rows.map(async (row) => {
      const quote = await fetchQuote(row.symbol);
      const marketValue = Number(row.qty) * Number(quote.price);
      return { ...row, ...quote, marketValue };
    })
  );
  return enriched;
}

export async function getPerformance() {
  const { rows } = await query(
    `SELECT
        COUNT(*) FILTER (WHERE side = 'BUY') AS buys,
        COUNT(*) FILTER (WHERE side = 'SELL') AS sells,
        SUM(CASE WHEN side='SELL' THEN quantity*price ELSE 0 END) AS proceeds,
        SUM(CASE WHEN side='BUY' THEN quantity*price ELSE 0 END) AS cost
     FROM trades`
  );
  const stats = rows[0];
  const pnl = Number(stats.proceeds || 0) - Number(stats.cost || 0);
  return { ...stats, pnl };
}

export async function listWatchlist() {
  const { rows } = await query(
    `SELECT id, symbol, note, created_at FROM watchlist ORDER BY created_at DESC`
  );
  return rows;
}

export async function addWatchItem(symbol, note) {
  const { rows } = await query(
    `INSERT INTO watchlist(symbol, note) VALUES($1, $2) RETURNING *`,
    [symbol, note || null]
  );
  return rows[0];
}

export async function recordTrade({ symbol, side, quantity, price }) {
  const { rows } = await query(
    `INSERT INTO trades(symbol, side, quantity, price) VALUES($1,$2,$3,$4) RETURNING *`,
    [symbol, side.toUpperCase(), quantity, price]
  );
  const trade = rows[0];

  // create a simple notification whenever a trade is recorded
  await query(
    `INSERT INTO notifications(message) VALUES ($1)`,
    [
      `New trade: ${trade.side} ${trade.quantity} ${trade.symbol} @ ${trade.price}`,
    ]
  );

  return trade;
}

export async function listNotifications() {
  const { rows } = await query(
    `SELECT id, message, read, created_at
     FROM notifications
     ORDER BY created_at DESC
     LIMIT 20`
  );
  return rows;
}

export async function markNotificationRead(id) {
  await query(`UPDATE notifications SET read = TRUE WHERE id = $1`, [id]);
}
