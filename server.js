const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const PI_API_KEY = process.env.PI_API_KEY;

// ==========================
// HOME
// ==========================
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ==========================
// CHECK ENV KEY
// ==========================
app.get("/check", (req, res) => {
  res.send(PI_API_KEY ? "KEY FOUND ✅" : "KEY MISSING ❌");
});

// ==========================
// SIMPLE TEST ROUTE
// ==========================
app.get("/test-key", (req, res) => {
  res.send("ROUTE TEST OK ✅");
});

// ==========================
// REAL PI KEY TEST
// ==========================
app.get("/pi-test", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.minepi.com/v2/me",
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.json({
      error: error.response?.data || error.message
    });
  }
});

// ==========================
// APPROVE PAYMENT
// ==========================
app.post("/approve-payment", async (req, res) => {
  try {
    const { paymentId } = req.body;

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
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

// ==========================
// COMPLETE PAYMENT
// ==========================
app.post("/complete-payment", async (req, res) => {
  try {
    const { paymentId, txid } = req.body;

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
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

// ==========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
