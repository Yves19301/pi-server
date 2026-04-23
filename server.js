const express = require("express");
const app = express();
app.use(express.json());

app.post("/approve", (req, res) => {
  console.log("Approve:", req.body);
  res.json({ success: true });
});

app.post("/complete", (req, res) => {
  console.log("Complete:", req.body);
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Pi Server is running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
