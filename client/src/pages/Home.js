 import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box>
      {/* Hero Section with Parallax */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          backgroundImage: 'url("/pexels-adriendrj-33980501.jpg")',
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
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1
          }
        }}
      >
        <Container 
          maxWidth="md" 
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography 
              variant="h1" 
              sx={{
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 'normal',
                mb: 3,
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '0.02em'
              }}
            >
              Culinary Excellence
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'light',
                letterSpacing: '0.05em'
              }}
            >
              Where Every Occasion Becomes Extraordinary
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Button
              variant="outlined"
              component={Link}
              to="/packages"
              size="large"
              sx={{
                py: 2,
                px: 4,
                color: 'white',
                borderColor: 'white',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'white',
                  color: 'black',
                  transform: 'scale(1.05)'
                },
                fontFamily: 'Playfair Display, serif',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease'
              }}
            >
              Discover Our Services
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Section */}
      <Box 
        sx={{ 
          py: 15,
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    mb: 4,
                    fontFamily: 'Playfair Display, serif',
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  Crafting Memorable Experiences
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary'
                  }}
                >
                  From intimate gatherings to grand celebrations, our expert team brings creativity and precision to every event. We combine exceptional cuisine with impeccable service to create unforgettable moments.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/about"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black'
                    }
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="/pexels-asadphoto-11340077.jpg"
                  alt="Featured Catering"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section with Parallax */}
      <Box
        sx={{
          py: 15,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backgroundImage: 'url("/pexels-asadphoto-28408327.jpg")',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          color: 'white'
        }}
      >
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: '1000+', label: 'Events Catered' },
              { number: '50+', label: 'Venues Partnered' },
              { number: '15+', label: 'Years Experience' }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box textAlign="center">
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        mb: 2,
                        fontFamily: 'Playfair Display, serif',
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{
                        fontFamily: 'Playfair Display, serif',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
