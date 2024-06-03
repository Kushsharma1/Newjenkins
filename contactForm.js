const sqlite3 = require('sqlite3').verbose();

// Define the database file path
const dbFilePath = './server/mydatabase.db'; // Change the path as needed

// Create a new SQLite3 database
const db = new sqlite3.Database(dbFilePath);

// Create and initialize the database schema (e.g., tables)
db.serialize(() => {
  // Create a table for the user data without an ID
  db.run(`
    CREATE TABLE IF NOT EXISTS user_data (
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT
    )
  `);

  console.log('Database schema initialized successfully.');
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
