const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PI_API_KEY ="csmiqu5u3u8pcw6n7vylh0serbyacnehiwfuburanxsa1dq4vscitzuts86kfytm;

app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send({ success: true });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send({ success: true });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.listen(3000, () => console.log("Server running"));
