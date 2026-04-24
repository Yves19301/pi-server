const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

// APPROVE
app.post("/approve", (req, res) => {
  console.log("Approve:", req.body);
  res.json({ success: true });
});

// COMPLETE
app.post("/complete", (req, res) => {
  console.log("Complete:", req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
