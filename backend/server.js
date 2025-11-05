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
  const { search, archived, category, read } = req.query;
  
  let query = "SELECT * FROM feedback WHERE 1=1";
  const params = [];
  
  // Filter by archived status
  if (archived === "true") {
    query += " AND is_archived = 1";
  } else if (archived === "false") {
    query += " AND is_archived = 0";
  }
  
  // Filter by category
  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }
  
  // Filter by read status
  if (read === "true") {
    query += " AND is_read = 1";
  } else if (read === "false") {
    query += " AND is_read = 0";
  }
  
  // Search functionality
  if (search) {
    query += " AND (message LIKE ? OR category LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  
  query += " ORDER BY created_at DESC";
  
  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// PATCH - Mark feedback as read/unread
app.patch("/api/feedback/:id/read", (req, res) => {
  const { id } = req.params;
  const { is_read } = req.body;
  
  db.query(
    "UPDATE feedback SET is_read = ? WHERE id = ?",
    [is_read, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ success: true });
    }
  );
});

// PATCH - Archive/unarchive feedback
app.patch("/api/feedback/:id/archive", (req, res) => {
  const { id } = req.params;
  const { is_archived } = req.body;
  
  db.query(
    "UPDATE feedback SET is_archived = ? WHERE id = ?",
    [is_archived, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ success: true });
    }
  );
});

// DELETE feedback
app.delete("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  
  db.query("DELETE FROM feedback WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true });
  });
});

// ANALYTICS ENDPOINTS

// GET total feedback count
app.get("/api/analytics/total", (req, res) => {
  db.query("SELECT COUNT(*) as total FROM feedback", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ total: results[0].total });
  });
});

// GET feedback by category
app.get("/api/analytics/by-category", (req, res) => {
  db.query(
    "SELECT category, COUNT(*) as count FROM feedback GROUP BY category ORDER BY count DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// GET feedback trends over time (last 30 days)
app.get("/api/analytics/trends", (req, res) => {
  const days = req.query.days || 30;
  db.query(
    `SELECT DATE(created_at) as date, COUNT(*) as count 
     FROM feedback 
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY DATE(created_at) 
     ORDER BY date ASC`,
    [days],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// GET sentiment analysis (based on category)
app.get("/api/analytics/sentiment", (req, res) => {
  db.query(
    `SELECT 
      SUM(CASE WHEN category = 'Praise' THEN 1 ELSE 0 END) as positive,
      SUM(CASE WHEN category = 'Complaint' THEN 1 ELSE 0 END) as negative,
      SUM(CASE WHEN category NOT IN ('Praise', 'Complaint') THEN 1 ELSE 0 END) as neutral,
      COUNT(*) as total
     FROM feedback`,
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      const data = results[0];
      res.json({
        positive: data.positive,
        negative: data.negative,
        neutral: data.neutral,
        total: data.total,
        positivePercent: ((data.positive / data.total) * 100).toFixed(1),
        negativePercent: ((data.negative / data.total) * 100).toFixed(1),
        neutralPercent: ((data.neutral / data.total) * 100).toFixed(1)
      });
    }
  );
});

// GET most active days and times
app.get("/api/analytics/activity", (req, res) => {
  const dayQuery = `
    SELECT DAYNAME(created_at) as day, COUNT(*) as count 
    FROM feedback 
    GROUP BY DAYNAME(created_at), DAYOFWEEK(created_at)
    ORDER BY DAYOFWEEK(created_at)
  `;
  
  const hourQuery = `
    SELECT HOUR(created_at) as hour, COUNT(*) as count 
    FROM feedback 
    GROUP BY HOUR(created_at)
    ORDER BY hour ASC
  `;
  
  db.query(dayQuery, (err1, dayResults) => {
    if (err1) return res.status(500).json({ error: "Database error" });
    
    db.query(hourQuery, (err2, hourResults) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      
      res.json({
        byDay: dayResults,
        byHour: hourResults
      });
    });
  });
});

app.listen(4000, () => console.log("🚀 Express running on http://localhost:4000"));
