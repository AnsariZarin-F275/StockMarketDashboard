import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export async function searchStocks(term) {
  const { data } = await api.get("/stocks/search", { params: { q: term } });
  return data;
}

export async function getQuote(symbol) {
  const { data } = await api.get(`/stocks/quote/${symbol}`);
  return data;
}

export async function getHoldings() {
  const { data } = await api.get("/portfolio/holdings");
  return data;
}

export async function getPerformance() {
  const { data } = await api.get("/portfolio/performance");
  return data;
}

export async function getWatchlist() {
  const { data } = await api.get("/portfolio/watchlist");
  return data;
}

export async function addWatchlist(symbol, note) {
  const { data } = await api.post("/portfolio/watchlist", { symbol, note });
  return data;
}

export async function simulateTrade(payload) {
  const { data } = await api.post("/portfolio/trade", payload);
  return data;
}

export async function getNotifications() {
  const { data } = await api.get("/portfolio/notifications");
  return data;
}

export async function markNotificationRead(id) {
  await api.post(`/portfolio/notifications/${id}/read`);
}


