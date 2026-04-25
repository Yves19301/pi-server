const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PI_API_KEY = "cx57ycdesy6vbgz04ukustswsi2k9fp1sz7fkr6rdhfcqhfxgngoauy4nrscwcqc";

// APPROVE
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

    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Approval failed");
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

    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Completion failed");
  }
});

app.listen(3000, () => console.log("Server running"));
