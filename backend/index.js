// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { validateForm } = require("./validate.js");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  const data = req.body;
  const errors = validateForm(data);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const saved = await prisma.udyamSubmission.create({ data });
    res.json({ success: true, id: saved.id });
  } catch (e) {
    res.status(500).json({ error: "Database error", details: e.message });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend running on port 4000");
});
