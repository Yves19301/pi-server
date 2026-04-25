const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PI_API_KEY = "";
an8zuaifznyiqjk6rqvckrrfkftkdh5xaiyxlzridmf1elfa6hsjendzdq2dfv7f
// APPROVE PAYMENT
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

    console.log("APPROVED:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("ERROR APPROVE:", error.response?.data);
    res.status(500).json(error.response?.data);
  }
});

// COMPLETE PAYMENT
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

    console.log("COMPLETED:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("ERROR COMPLETE:", error.response?.data);
    res.status(500).json(error.response?.data);
  }
});

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started");
});
