import React, { useEffect, useState } from "react";
import { getHoldings, getPerformance } from "../api.js";

export default function PortfolioTable() {
  const [rows, setRows] = useState([]);
  const [perf, setPerf] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const holdings = await getHoldings();
    setRows(holdings);
    const p = await getPerformance();
    setPerf(p);
  }

  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Portfolio</h3>
        <button onClick={refresh}>Refresh</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Avg Price</th>
            <th>Last</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.symbol}>
              <td>{r.symbol}</td>
              <td>{Number(r.qty).toFixed(2)}</td>
              <td>{Number(r.avg_price).toFixed(2)}</td>
              <td>{Number(r.price).toFixed(2)}</td>
              <td>{Number(r.marketValue).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {perf && (
        <div style={{ marginTop: 12 }}>
          PnL: {Number(perf.pnl).toFixed(2)} | Buys: {perf.buys} | Sells:{" "}
          {perf.sells}
        </div>
      )}
    </div>
  );
}






