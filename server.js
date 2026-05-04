const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔐 API KEY (shyiramo iyyawe cyangwa use env variable)
const PI_API_KEY = process.env.PI_API_KEY || "YOUR_API_KEY_HERE";

// 🟢 HOME ROUTE (fix "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Server is running ✅ Pi Backend Active");
});

// 🟡 APPROVE PAYMENT
app.post("/approve", async (req, res) => {
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

    res.json({ success: true, data: response.data });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message
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
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message
    });
  }
});

// 🚀 PORT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
