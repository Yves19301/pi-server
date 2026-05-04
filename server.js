const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PI_API_KEY ="nudtxv8k4w1i2ndvrou3fukreraimcf95mstsksq0wyvewvpvs3zxy2etwizt4kj";

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
