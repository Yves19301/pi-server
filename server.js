const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Shiramwo TESTNET API KEY
const PI_API_KEY = "SHIRA_TESTNET_API_KEY_HANO";

// APPROVE
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const r = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send(r.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// COMPLETE
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const r = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send(r.data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3000, () => console.log("Server running"));
