import React from "react";

export default function Education() {
  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Learn the Basics</h3>
      </div>
      <p>
        This dashboard is a <strong>simulation</strong>. It helps you practice
        without using real money.
      </p>
      <ul>
        <li>
          <strong>Stock</strong>: a small piece of a company (e.g., AAPL =
          Apple).
        </li>
        <li>
          <strong>Buy</strong>: you add shares to your portfolio.
        </li>
        <li>
          <strong>Sell</strong>: you remove shares and maybe take profit or
          loss.
        </li>
        <li>
          <strong>Portfolio</strong>: all the stocks you currently hold.
        </li>
        <li>
          <strong>Watchlist</strong>: stocks you want to keep an eye on.
        </li>
      </ul>
      <p>
        You can also explore beginner articles on sites like{" "}
        <a href="https://www.investopedia.com" target="_blank" rel="noreferrer">
          Investopedia
        </a>{" "}
        to learn more concepts.
      </p>
    </div>
  );
}






