const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bookstore',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(dbConfig);

// Function to connect with retries
const connectWithRetry = (count = 0) => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  console.log(`Attempting to connect to Database at ${dbConfig.host}:${dbConfig.port} (Attempt ${count + 1}/${maxRetries})...`);

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      if (count < maxRetries) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(() => connectWithRetry(count + 1), retryDelay);
      } else {
        console.error('Could not connect to the database after maximum retries.');
        process.exit(1);
      }
    } else {
      console.log('Successfully connected to Database at:', res.rows[0].now);
    }
  });
};

connectWithRetry();

// Routes
// 1. GET all books
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. ADD a book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, price, cover_url } = req.body;
    const newBook = await pool.query(
      'INSERT INTO books (title, author, price, cover_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, price, cover_url]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. DELETE a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
