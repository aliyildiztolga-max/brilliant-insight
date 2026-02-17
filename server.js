import express from "express";
import cors from "cors";

const app = express();
app.use(cors());              // Elementor/WordPress için CORS açıyoruz
app.use(express.json());

// RAM içinde geçici sinyal listesi (test için yeterli)
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

// Elementor buradan çekecek
app.get("/api/signals", (req, res) => {
  res.json(signals);
});

// CoinClass webhook (CoinClass buraya POST atacak)
app.post("/api/webhook/coinclass", (req, res) => {
  const payload = req.body;

  // payload tek sinyal ise direkt ekle; dizi ise hepsini ekle
  if (Array.isArray(payload)) {
    signals = payload.map(x => ({ ...x, time: x.time || new Date().toISOString() }));
  } else {
    signals.unshift({ ...payload, time: payload.time || new Date().toISOString() });
  }

  // listeyi 200 ile sınırla
  signals = signals.slice(0, 200);

  res.json({ ok: true, count: signals.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
