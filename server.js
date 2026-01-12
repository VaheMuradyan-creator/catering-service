 const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const packagesRouter = require('./routes/packages');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' 
        ? process.env.PRODUCTION_URL || 'https://goldenservicebyAni.com'
        : 'http://localhost:3000')
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Middleware
app.use(express.json());
app.use('/api/packages', packagesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Database setup
const db = new sqlite3.Database('./catering.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT,
            google_id TEXT UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME,
            is_verified BOOLEAN DEFAULT 0
        )`);

        // Packages table
        db.run(`CREATE TABLE IF NOT EXISTS packages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            min_guests INTEGER,
            max_guests INTEGER
        )`);

        // Menu items table
        db.run(`CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            category TEXT,
            price REAL NOT NULL,
            available BOOLEAN DEFAULT 1
        )`);

        // Orders table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
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

// Validation middleware
const validateRegistration = [
    body('email').isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('name').trim().notEmpty()
];

// Authentication Endpoints with validation
app.post('/api/auth/register', validateRegistration, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
        
        db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ message: 'Email already exists' });
                    }
                    throw err;
                }
                res.json({ message: 'Registration successful' });
            }
        );
    } catch (error) {
        next(error);
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        db.get(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET || 'your-default-secret-key',
                    { expiresIn: '24h' }
                );
                
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    } catch (error) {
        next(error);
    }
});

app.post('/api/auth/google', validateRegistration, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, googleId } = req.body;
        
        db.get(
            'SELECT * FROM users WHERE email = ? OR google_id = ?',
            [email, googleId],
            async (err, user) => {
                if (err) throw err;

                let userId;
                
                if (!user) {
                    // Create new user
                    db.run(
                        'INSERT INTO users (name, email, google_id, is_verified) VALUES (?, ?, ?, 1)',
                        [name, email, googleId],
                        function(err) {
                            if (err) throw err;
                            userId = this.lastID;
                        }
                    );
                } else {
                    userId = user.id;
                    // Update last login
                    db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [userId]);
                }

                const token = jwt.sign(
                    { id: userId },
                    process.env.JWT_SECRET || 'your-default-secret-key',
                    { expiresIn: '24h' }
                );

                res.json({
                    token,
                    user: {
                        id: userId,
                        name,
                        email,
                        isVerified: true
                    }
                });
            }
        );
    } catch (error) {
        next(error);
    }
});

// Routes

// Get all packages
app.get('/api/packages', (req, res) => {
    db.all('SELECT * FROM packages', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get all menu items
app.get('/api/menu-items', (req, res) => {
    db.all('SELECT * FROM menu_items', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Create new order
app.post('/api/orders', (req, res) => {
    const {
        customer_name,
        email,
        phone,
        package_id,
        total_price,
        event_date,
        guest_count,
        special_requests
    } = req.body;

    db.run(
        `INSERT INTO orders (
            customer_name, email, phone, package_id, 
            total_price, event_date, guest_count, special_requests
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [customer_name, email, phone, package_id, total_price, event_date, guest_count, special_requests],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Order created successfully',
                orderId: this.lastID
            });
        }
    );
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
    db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(row);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
