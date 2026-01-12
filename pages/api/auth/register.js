import { getDb } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validation
    await Promise.all([
      body('email').isEmail().normalizeEmail().run(req),
      body('password').optional().isLength({ min: 6 }).run(req),
      body('name').trim().notEmpty().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const db = getDb();

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              res.status(400).json({ message: 'Email already exists' });
              resolve();
              return;
            }
            reject(err);
            return;
          }
          res.status(201).json({ message: 'Registration successful' });
          resolve();
        }
      );
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
