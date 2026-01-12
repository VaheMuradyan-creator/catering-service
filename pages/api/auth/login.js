import { getDb } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const db = getDb();

    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            resolve();
            return;
          }

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            res.status(400).json({ message: 'Invalid credentials' });
            resolve();
            return;
          }

          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'your-default-secret-key',
            { expiresIn: '24h' }
          );

          res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
          resolve();
        }
      );
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
