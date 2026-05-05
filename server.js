const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// 🔵 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔵 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀 Pi Backend Active");
});

// 🔵 APPROVE PAYMENT
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`
        }
      }
    );

    return res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.log("APPROVE ERROR:", error.response?.data || error.message);

    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 🔵 COMPLETE PAYMENT
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`
        }
      }
    );

    return res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.log("COMPLETE ERROR:", error.response?.data || error.message);

    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 🔵 START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
