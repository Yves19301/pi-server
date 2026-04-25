const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.post("/approve-payment", (req, res) => {
  console.log("Approve:", req.body.paymentId);
  res.json({ success: true });
});

app.post("/complete-payment", (req, res) => {
  console.log("Complete:", req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
