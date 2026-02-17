import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test sinyali (şimdilik)
let signals = [
  {
    coin: "BTCUSDT",
    direction: "LONG",
    entry: 67000,
    tp: 69000,
    sl: 66000,
    time: new Date().toISOString()
  }
];

// Sağlık kontrolü
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Sinyal listesi
app.get("/api/signals", (req, res) => {
  res.json(signals);
});

// Test için yeni sinyal ekleme
app.post("/api/signals", (req, res) => {
  const s = { ...req.body, time: new Date().toISOString() };
  signals.unshift(s);
  res.json({ ok: true, added: s });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on", PORT));
