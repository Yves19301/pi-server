const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Fata API Key muri environment
const PI_API_KEY = process.env.PI_API_KEY;

// TEST
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// APPROVE
app.post("/approve-payment", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Approval failed" });
  }
});

// COMPLETE
app.post("/complete-payment", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Completion failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
