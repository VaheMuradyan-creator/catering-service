const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database setup - use /tmp for Vercel serverless
const dbPath = process.env.VERCEL 
  ? '/tmp/catering.db' 
  : path.join(process.cwd(), 'catering.db');

let db = null;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
      }
    });
  }
  return db;
}

function initializeDatabase() {
  const database = getDb();
  database.serialize(() => {
    database.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      google_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      is_verified BOOLEAN DEFAULT 0
    )`);

    database.run(`CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      min_guests INTEGER,
      max_guests INTEGER
    )`);

    database.run(`CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price REAL NOT NULL,
      available BOOLEAN DEFAULT 1
    )`);

    database.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      package_id INTEGER,
      total_price REAL NOT NULL,
      event_date DATE,
      guest_count INTEGER,
      status TEXT DEFAULT 'pending',
      special_requests TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(package_id) REFERENCES packages(id)
    )`);
  });
}

module.exports = { getDb };
