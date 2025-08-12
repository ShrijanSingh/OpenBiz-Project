const request = require("supertest");
const express = require("express");
const { validateForm } = require("../validate.js");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post("/api/submit", async (req, res) => {
  const data = req.body;
  const errors = await validateForm(data);
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

describe("POST /api/submit", () => {
  it("should return 400 for invalid PAN", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({
        aadhaar: "123456789012",
        aadhaar_name: "Test User",
        otp: "123456",
        pan: "INVALIDPAN"
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveProperty("pan");
  });

  it("should return 200 for valid data", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({
        aadhaar: "123456789012",
        aadhaar_name: "Test User",
        otp: "123456",
        pan: "ABCDE1234F"
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("id");
  });
});
