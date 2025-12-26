import React, { useMemo } from "react";
import Chart from "./components/Chart.jsx";
import PortfolioTable from "./components/PortfolioTable.jsx";
import Watchlist from "./components/Watchlist.jsx";
import TradeSimulator from "./components/TradeSimulator.jsx";
import Notifications from "./components/Notifications.jsx";
import Education from "./components/Education.jsx";

export default function App() {
  const chartData = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        date: `M${i + 1}`,
        value: 10000 + i * 250 + Math.random() * 500,
      })),
    []
  );

  return (
    <div className="layout">
      <h1>Stock Market Dashboard</h1>
      <div className="grid">
        <Chart data={chartData} />
        <TradeSimulator />
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        <PortfolioTable />
        <Watchlist />
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        <Notifications />
        <Education />
      </div>
    </div>
  );
}


