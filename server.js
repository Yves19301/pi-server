const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// APPROVE PAYMENT
app.post("/approve-payment", (req, res) => {
  console.log("Approve:", req.body.paymentId);
  res.sendStatus(200);
});

// COMPLETE PAYMENT
app.post("/complete-payment", (req, res) => {
  console.log("Complete:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
