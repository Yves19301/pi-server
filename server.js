const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// APPROVE PAYMENT
app.post("/approve-payment", (req, res) => {
  const { paymentId } = req.body;

  console.log("APPROVE:", paymentId);

  // VERY IMPORTANT: respond with JSON
  res.json({ success: true });
});

// COMPLETE PAYMENT
app.post("/complete-payment", (req, res) => {
  const { paymentId, txid } = req.body;

  console.log("COMPLETE:", paymentId, txid);

  // VERY IMPORTANT: respond with JSON
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
