import axios from "axios";

const BASE = "https://www.alphavantage.co/query";
const API_KEY = process.env.MARKET_API_KEY || "";

async function callAlphaVantage(params) {
  const url = `${BASE}?${new URLSearchParams({
    ...params,
    apikey: API_KEY,
  }).toString()}`;
  const { data } = await axios.get(url);
  if (data["Error Message"] || data.Note) {
    throw new Error(
      data["Error Message"] ||
        data.Note ||
        "AlphaVantage error; check your key or throttle limits."
    );
  }
  return data;
}

export async function fetchQuote(symbol) {
  if (!API_KEY) {
    return {
      symbol,
      price: 100,
      change: 0,
      changePercent: 0,
      note: "Using mock data; set MARKET_API_KEY for live quotes.",
    };
  }
  const data = await callAlphaVantage({
    function: "GLOBAL_QUOTE",
    symbol,
  });
  const quote = data["Global Quote"] || {};
  return {
    symbol,
    price: Number(quote["05. price"] || 0),
    change: Number(quote["09. change"] || 0),
    changePercent: Number(quote["10. change percent"]?.replace("%", "") || 0),
  };
}

export async function searchTicker(query) {
  if (!API_KEY) {
    return [
      { symbol: "AAPL", name: "Apple Inc." },
      { symbol: "MSFT", name: "Microsoft Corp" },
    ];
  }
  const data = await callAlphaVantage({
    function: "SYMBOL_SEARCH",
    keywords: query,
  });
  return (data.bestMatches || []).map((m) => ({
    symbol: m["1. symbol"],
    name: m["2. name"],
  }));
}






