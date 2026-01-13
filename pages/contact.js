import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ParallaxImage from '../components/ParallaxImage';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will contact you soon.');
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '40vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <ParallaxImage 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" 
          alt="Contact Us"
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
              Contact Us
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
              Have questions? We're here to help
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#1a5f7a',
                    mb: 4,
                    fontWeight: 600
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#6b6b6b',
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.8
                  }}
                >
                  Whether you're planning a luxury boat event or a traditional venue celebration, 
                  our team is ready to create an unforgettable experience for you.
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  >
                    <LocationOnIcon sx={{ mr: 2, color: '#1a5f7a' }} />
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', color: '#2c3e50' }}>
                      123 Maritime Avenue, Coastal City, CC 12345
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  >
                    <PhoneIcon sx={{ mr: 2, color: '#1a5f7a' }} />
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', color: '#2c3e50' }}>
                      (555) 123-4567
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  >
                    <EmailIcon sx={{ mr: 2, color: '#1a5f7a' }} />
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', color: '#2c3e50' }}>
                      info@maritimecatering.com
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
                    p: 4
                  }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        fontFamily: 'Inter, sans-serif'
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      backgroundColor: '#1a5f7a',
                      color: 'white',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      borderRadius: '10px',
                      '&:hover': {
                        backgroundColor: '#0a4d68',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(26, 95, 122, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
