const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Pi Server Running ✅");
});

// APPROVE PAYMENT
app.post("/approve", (req, res) => {
  const { paymentId } = req.body;
  console.log("Approve:", paymentId);

  // Normally here you call Pi API with your API key

  res.json({ success: true });
});

// COMPLETE PAYMENT
app.post("/complete", (req, res) => {
  const { paymentId, txid } = req.body;
  console.log("Complete:", paymentId, txid);

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
