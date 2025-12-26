import React, { useState } from "react";
import { simulateTrade } from "../api.js";

export default function TradeSimulator() {
  const [symbol, setSymbol] = useState("AAPL");
  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(100);
  const [message, setMessage] = useState("");

  async function submit() {
    const trade = await simulateTrade({
      symbol,
      side,
      quantity: Number(quantity),
      price: Number(price),
    });
    setMessage(
      `Recorded ${trade.side} ${trade.quantity} ${trade.symbol} @ ${trade.price}`
    );
  }

  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Trade Simulator</h3>
      </div>
      <div className="grid">
        <div>
          <label>Symbol</label>
          <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </div>
        <div>
          <label>Side</label>
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option>BUY</option>
            <option>SELL</option>
          </select>
        </div>
        <div>
          <label>Qty</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <button style={{ marginTop: 12 }} onClick={submit}>
        Record Trade
      </button>
      {message && <div style={{ marginTop: 8 }}>{message}</div>}
    </div>
  );
}






