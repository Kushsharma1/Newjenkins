const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


// SQLite3 setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('userdata.db');

// Create a table to store user data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_data (
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT
    )
  `);
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Insert user data into the database
  db.run('INSERT INTO user_data (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
    if (err) {
      console.error(err.message);
      res.sendStatus(500); // Internal Server Error
    } else {
      // Render the thank you page with user's data
      res.render('thankyou', { name, email, message });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
