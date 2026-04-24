const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// APPROVE payment
app.post("/approve", (req, res) => {
  const { paymentId } = req.body;
  console.log("Approving:", paymentId);

  // Here you should call Pi API (for now just simulate)
  res.json({ success: true });
});

// COMPLETE payment
app.post("/complete", (req, res) => {
  const { paymentId, txid } = req.body;
  console.log("Completing:", paymentId, txid);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
