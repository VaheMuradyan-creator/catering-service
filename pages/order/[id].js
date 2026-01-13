import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import PrivateRoute from '../../components/PrivateRoute';
import ParallaxImage from '../../components/ParallaxImage';

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
      <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            height: '30vh',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" 
            alt="Place Order"
            speed={0.2}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(26,95,122,0.4) 100%)',
              zIndex: 2
            }}
          />
          <Container
            sx={{
              position: 'relative',
              zIndex: 3,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                p: { xs: 4, md: 6 },
                maxWidth: '800px'
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  color: '#1a5f7a',
                  mb: 2
                }}
              >
                Place Your Order
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.3rem' },
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  color: '#2c3e50',
                  lineHeight: 1.7
                }}
              >
                Complete the form below to book your catering service
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Form Section */}
        <Box 
          sx={{ 
            py: { xs: 8, md: 12 }, 
            position: 'relative',
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 0
            }
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(26, 95, 122, 0.15)',
                  borderRadius: '20px',
                  p: { xs: 4, md: 6 }
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          fontFamily: 'Inter, sans-serif'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      fullWidth
                      sx={{
                        py: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        color: '#1a5f7a',
                        borderColor: '#1a5f7a',
                        borderWidth: '2px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        borderRadius: '10px',
                        fontSize: '1.1rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Submit Order
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
