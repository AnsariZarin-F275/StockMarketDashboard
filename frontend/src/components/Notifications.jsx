import React, { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "../api.js";

export default function Notifications() {
  const [items, setItems] = useState([]);

  async function load() {
    const data = await getNotifications();
    setItems(data);
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5000); // simple polling every 5s
    return () => clearInterval(id);
  }, []);

  async function handleRead(id) {
    await markNotificationRead(id);
    load();
  }

  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Notifications</h3>
      </div>
      {items.length === 0 && <div>No notifications yet.</div>}
      {items.map((n) => (
        <div
          key={n.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
            opacity: n.read ? 0.6 : 1,
          }}
        >
          <span>
            {new Date(n.created_at).toLocaleTimeString()} – {n.message}
          </span>
          {!n.read && (
            <button onClick={() => handleRead(n.id)}>Mark read</button>
          )}
        </div>
      ))}
    </div>
  );
}






