import { getDb } from '../../lib/db';

export default function handler(req, res) {
  const db = getDb();

  if (req.method === 'POST') {
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
  } else if (req.method === 'GET' && req.query.id) {
    db.get('SELECT * FROM orders WHERE id = ?', [req.query.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(row);
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
