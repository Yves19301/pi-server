const express = require("express");
const app = express();

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Pi Server is running");
});

// APPROVE
app.post("/approve", (req, res) => {
  console.log("APPROVE HIT", req.body);
  res.json({ success: true });
});

// COMPLETE
app.post("/complete", (req, res) => {
  console.log("COMPLETE HIT", req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
