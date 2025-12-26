import React, { useState, useEffect } from "react";
import { addWatchlist, getWatchlist, searchStocks } from "../api.js";

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const data = await getWatchlist();
    setItems(data);
  }

  async function handleSearch() {
    const data = await searchStocks(query);
    setResults(data);
  }

  async function add(symbol) {
    await addWatchlist(symbol, note);
    setNote("");
    setQuery("");
    setResults([]);
    refresh();
  }

  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Watchlist</h3>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ticker"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {results.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {results.map((r) => (
            <div
              key={r.symbol}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span>
                {r.symbol} - {r.name}
              </span>
              <button onClick={() => add(r.symbol)}>Add</button>
            </div>
          ))}
        </div>
      )}
      <textarea
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note"
        style={{ width: "100%", marginTop: 8, borderRadius: 8 }}
      />
      <h4>Saved</h4>
      {items.map((i) => (
        <div key={i.id} style={{ marginBottom: 6 }}>
          {i.symbol} — {i.note || "No note"}
        </div>
      ))}
    </div>
  );
}






