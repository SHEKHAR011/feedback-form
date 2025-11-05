import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// POST feedback
app.post("/api/feedback", (req, res) => {
  const { message, category } = req.body;
  console.log("Received feedback:", { message, category }); // Debug log
  if (!message) return res.status(400).json({ error: "Message required" });

  db.query(
    "INSERT INTO feedback (message, category) VALUES (?, ?)",
    [message, category || "General"],
    (err, result) => {
      if (err) {
        console.error("Database error:", err); // Debug log
        return res.status(500).json({ error: "Database error" });
      }
      console.log("Feedback inserted with ID:", result.insertId); // Debug log
      res.json({ success: true });
    }
  );
});

// GET all feedback (for admin)
app.get("/api/feedback", (req, res) => {
  db.query("SELECT * FROM feedback ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.listen(4000, () => console.log("🚀 Express running on http://localhost:4000"));
