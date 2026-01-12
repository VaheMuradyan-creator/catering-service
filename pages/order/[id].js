import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid
} from '@mui/material';
import axios from 'axios';
import PrivateRoute from '../../components/PrivateRoute';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function OrderForm() {
  const router = useRouter();
  const { id: packageId } = router.query;
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    event_date: '',
    guest_count: '',
    special_requests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, {
        ...formData,
        package_id: packageId,
        total_price: 0
      });
      
      if (response.status === 201) {
        alert('Order submitted successfully!');
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  return (
    <PrivateRoute>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Place Your Order
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Event Date"
                  name="event_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Number of Guests"
                  name="guest_count"
                  type="number"
                  value={formData.guest_count}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Requests"
                  name="special_requests"
                  multiline
                  rows={4}
                  value={formData.special_requests}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </PrivateRoute>
  );
}
