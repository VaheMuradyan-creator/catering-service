import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Divider, Chip } from '@mui/material';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import OceanScene from '../components/OceanScene';
import { Sailing, Restaurant, Diamond, Waves, Anchor } from '@mui/icons-material';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pricingOptions = [
    {
      type: 'boat',
      title: 'Luxury Boat Catering',
      icon: <Sailing sx={{ fontSize: 48, color: '#d4af37' }} />,
      price: 'From $150',
      perPerson: 'per person',
      features: [
        'Private yacht charter',
        'Oceanfront dining experience',
        'Premium seafood selection',
        'Professional crew & service',
        'Sunset & sunrise packages',
        'Customized menu planning',
        'Wine & champagne service',
        'Water activities included'
      ],
      highlight: true,
      color: '#0a4d68',
      accent: '#d4af37'
    },
    {
      type: 'regular',
      title: 'Traditional Catering',
      icon: <Restaurant sx={{ fontSize: 48, color: '#8b7355' }} />,
      price: 'From $75',
      perPerson: 'per person',
      features: [
        'Venue-based service',
        'Classic & modern cuisine',
        'Professional staff',
        'Event coordination',
        'Custom menu options',
        'Beverage service',
        'Setup & cleanup',
        'Flexible packages'
      ],
      highlight: false,
      color: '#2c2c2c',
      accent: '#8b7355'
    }
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section with 3D Ocean */}
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0a1929 0%, #0a4d68 50%, #1a5f7a 100%)'
        }}
      >
        {/* 3D Ocean Background */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}>
          <OceanScene />
        </Box>

        {/* Animated Waves Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(10, 77, 104, 0.3) 100%)',
            zIndex: 1
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white'
          }}
        >
          <motion.div
            style={{ opacity, scale }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Anchor sx={{ fontSize: 48, color: '#d4af37' }} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5.5rem' },
                  fontWeight: 300,
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2
                }}
              >
                Maritime
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 400,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '0.15em',
                mb: 3,
                color: '#d4af37',
                textTransform: 'uppercase'
              }}
            >
              Culinary Excellence
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 300,
                letterSpacing: '0.1em',
                mb: 6,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              Where the ocean meets extraordinary cuisine. Experience luxury catering aboard private yachts, 
              creating unforgettable moments on the open sea.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/packages" passHref legacyBehavior>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 2.5,
                    px: 6,
                    color: '#d4af37',
                    borderColor: '#d4af37',
                    borderWidth: '2px',
                    fontSize: '1.1rem',
                    fontFamily: '"Playfair Display", serif',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: '#d4af37',
                      color: '#0a1929',
                      borderColor: '#d4af37'
                    },
                    transition: 'all 0.4s ease'
                  }}
                >
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3
          }}
        >
          <Waves sx={{ color: '#d4af37', fontSize: 32 }} />
        </motion.div>
      </Box>

      {/* Luxury Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: '#0a1929',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#d4af37',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 300
              }}
            >
              Unparalleled Excellence
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              { icon: <Diamond />, title: 'Premium Quality', desc: 'Finest ingredients sourced globally' },
              { icon: <Sailing />, title: 'Luxury Vessels', desc: 'Exclusive access to private yachts' },
              { icon: <Waves />, title: 'Ocean Views', desc: 'Breathtaking seascapes as your backdrop' },
              { icon: <Restaurant />, title: 'Master Chefs', desc: 'Award-winning culinary expertise' }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      borderRadius: 0,
                      textAlign: 'center',
                      py: 4,
                      px: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        borderColor: '#d4af37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ color: '#d4af37', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          color: '#d4af37',
                          mb: 1,
                          fontWeight: 400
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1.1rem'
                        }}
                      >
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Comparison Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: 'linear-gradient(180deg, #0a1929 0%, #0a4d68 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#d4af37',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 300
              }}
            >
              Choose Your Experience
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontFamily: '"Cormorant Garamond", serif',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.3rem',
                fontWeight: 300
              }}
            >
              Compare our luxury boat catering with traditional venue services
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {pricingOptions.map((option, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    sx={{
                      backgroundColor: option.highlight 
                        ? 'rgba(212, 175, 55, 0.1)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: option.highlight 
                        ? '2px solid #d4af37' 
                        : '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: 0,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: '#d4af37',
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)'
                      },
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {option.highlight && (
                      <Chip
                        label="Most Popular"
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          backgroundColor: '#d4af37',
                          color: '#0a1929',
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 600,
                          zIndex: 1
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 5, color: 'white' }}>
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        {option.icon}
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: option.accent,
                            mt: 2,
                            mb: 1,
                            fontWeight: 400,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {option.title}
                        </Typography>
                        <Box sx={{ mt: 3, mb: 2 }}>
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: '"Playfair Display", serif',
                              color: option.accent,
                              fontWeight: 300,
                              display: 'inline'
                            }}
                          >
                            {option.price}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: '"Cormorant Garamond", serif',
                              color: 'rgba(255, 255, 255, 0.7)',
                              ml: 1,
                              display: 'inline',
                              fontSize: '1.2rem'
                            }}
                          >
                            {option.perPerson}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.3)', my: 4 }} />

                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {option.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2.5,
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: '1.15rem'
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: option.accent,
                                  mr: 2,
                                  flexShrink: 0
                                }}
                              />
                              <Typography
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  fontFamily: '"Cormorant Garamond", serif',
                                  fontSize: '1.15rem'
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          </motion.li>
                        ))}
                      </Box>

                      <Box sx={{ mt: 5, textAlign: 'center' }}>
                        <Link href={`/order/${option.type === 'boat' ? 'boat' : 'regular'}`} passHref legacyBehavior>
                          <Button
                            variant={option.highlight ? 'contained' : 'outlined'}
                            fullWidth
                            sx={{
                              py: 2,
                              px: 4,
                              backgroundColor: option.highlight ? option.accent : 'transparent',
                              color: option.highlight ? '#0a1929' : option.accent,
                              borderColor: option.accent,
                              borderWidth: '2px',
                              fontFamily: '"Playfair Display", serif',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              fontSize: '1rem',
                              '&:hover': {
                                backgroundColor: option.accent,
                                color: '#0a1929',
                                borderColor: option.accent
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Select Package
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Elegant CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: 'linear-gradient(135deg, #0a1929 0%, #1a3a4a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#d4af37',
                mb: 3,
                fontWeight: 300,
                letterSpacing: '0.1em'
              }}
            >
              Ready to Set Sail?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 6,
                fontSize: '1.3rem',
                fontWeight: 300,
                lineHeight: 1.8
              }}
            >
              Contact us to begin planning your extraordinary maritime dining experience. 
              Our team of experts will craft a bespoke event that exceeds all expectations.
            </Typography>
            <Link href="/contact" passHref legacyBehavior>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  py: 2.5,
                  px: 6,
                  color: '#d4af37',
                  borderColor: '#d4af37',
                  borderWidth: '2px',
                  fontSize: '1.1rem',
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: '#d4af37',
                    color: '#0a1929',
                    borderColor: '#d4af37'
                  },
                  transition: 'all 0.4s ease'
                }}
              >
                Schedule Consultation
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
