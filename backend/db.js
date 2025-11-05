import mysql from "mysql2";

// Update these values to match your MySQL configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",      // Use environment variable for password
  database: process.env.DB_NAME || "feedbackdb",
};

const db = mysql.createConnection(dbConfig);

// Create the feedback table if it doesn't exist
db.connect((err) => {
  if (err) {
    if (err.code === 'ECONNREFUSED') {
      console.error("❌ Cannot connect to MySQL server. Please ensure MySQL server is running.");
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("❌ Access denied. Please update the password in db.js to match your MySQL root password.");
      console.error("💡 To fix this: Open backend/db.js and update the 'password' field with your actual MySQL password.");
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      // Database doesn't exist, create it
      console.log("Database doesn't exist, creating it...");
      createDatabaseAndTable();
    } else {
      console.error("DB connection error:", err);
    }
  } else {
    console.log("✅ MySQL Connected to feedbackdb");
    createFeedbackTable();
  }
});

function createDatabaseAndTable() {
  // Connect without specifying database
  const tempDb = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  tempDb.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL server to create database:", err);
      return;
    }

    tempDb.query("CREATE DATABASE IF NOT EXISTS feedbackdb", (createDbErr) => {
      if (createDbErr) {
        console.error("Error creating database:", createDbErr);
        tempDb.end();
        return;
      }

      console.log("✅ Database 'feedbackdb' created successfully");
      tempDb.end();

      // Now reconnect with the database specified
      db.config.database = 'feedbackdb';
      db.connect((reconnectErr) => {
        if (reconnectErr) {
          console.error("Error reconnecting after database creation:", reconnectErr);
        } else {
          console.log("✅ MySQL Connected to feedbackdb");
          createFeedbackTable();
        }
      });
    });
  });
}

function createFeedbackTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS feedback (
      id INT AUTO_INCREMENT PRIMARY KEY,
      message TEXT NOT NULL,
      category VARCHAR(255) DEFAULT 'General',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating feedback table:", err);
    } else {
      console.log("✅ Feedback table created or already exists");
    }
  });
}

export default db;
