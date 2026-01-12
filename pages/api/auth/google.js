import { getDb } from '../../../lib/db';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validation
    await Promise.all([
      body('email').isEmail().normalizeEmail().run(req),
      body('name').trim().notEmpty().run(req),
      body('googleId').notEmpty().run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, googleId } = req.body;
    const db = getDb();

    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ? OR google_id = ?',
        [email, googleId],
        async (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          let userId;

          if (!user) {
            db.run(
              'INSERT INTO users (name, email, google_id, is_verified) VALUES (?, ?, ?, 1)',
              [name, email, googleId],
              function(err) {
                if (err) {
                  reject(err);
                  return;
                }
                userId = this.lastID;
                createToken();
              }
            );
          } else {
            userId = user.id;
            db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [userId], (err) => {
              if (err) {
                reject(err);
                return;
              }
              createToken();
            });
          }

          function createToken() {
            const token = jwt.sign(
              { id: userId },
              process.env.JWT_SECRET || 'your-default-secret-key',
              { expiresIn: '24h' }
            );

            res.status(200).json({
              token,
              user: {
                id: userId,
                name,
                email,
                isVerified: true
              }
            });
            resolve();
          }
        }
      );
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
