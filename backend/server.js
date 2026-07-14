require("dotenv").config();

const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
  res.send("BloodConnect Backend is Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});