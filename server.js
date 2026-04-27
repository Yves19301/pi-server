const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Port for Render
const PORT = process.env.PORT || 10000;

// Pi API Key from Render Environment
const PI_API_KEY = process.env.PI_API_KEY;

// ==============================
// HOME TEST
// ==============================
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ==============================
// CHECK IF KEY EXISTS
// ==============================
app.get("/check", (req, res) => {
  if (PI_API_KEY) {
    res.send("KEY FOUND ✅");
  } else {
    res.send("KEY MISSING ❌");
  }
});

// ==============================
// TEST PI API KEY
// ==============================
app.get("/test-key", async (req, res) => {
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

// ==============================
// APPROVE PAYMENT
// ==============================
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
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

// ==============================
// COMPLETE PAYMENT
// ==============================
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
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
