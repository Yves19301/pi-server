const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const PI_API_KEY=// ⚠️ from Pi Dev Portal

// APPROVEconst PI_API_KEY = process.env.PI_API_KEY;
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    console.log("APPROVED:", paymentId);
    res.json({ success: true });

  } catch (err) {
    console.error("APPROVE ERROR:", err.response?.data || err.message);
    res.status(500).send("Error approving payment");
  }
});

// COMPLETE
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    console.log("COMPLETED:", paymentId);
    res.json({ success: true });

  } catch (err) {
    console.error("COMPLETE ERROR:", err.response?.data || err.message);
    res.status(500).send("Error completing payment");
  }
});

app.get("/", (req, res) => {
  res.send("Pi Server running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
