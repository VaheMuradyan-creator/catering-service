import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Divider, Chip } from '@mui/material';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImage from '../components/ParallaxImage';
import { Sailing, Restaurant, Diamond, Waves, Anchor, LocalDining, WineBar } from '@mui/icons-material';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

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
      icon: <Sailing sx={{ fontSize: 48, color: '#1a5f7a' }} />,
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
      color: '#1a5f7a',
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
      color: '#6b6b6b',
      accent: '#8b7355'
    }
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section with Real Beach Image */}
      <Box
        component={motion.div}
        style={{ opacity: heroOpacity, scale: heroScale }}
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Parallax Beach Background */}
        <ParallaxImage 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" 
          alt="Luxury Beach"
          speed={0.3}
        />
        
        {/* Overlay Gradient */}
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


        {/* Glassmorphism Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 4,
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pt: { xs: 8, md: 0 }
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Anchor sx={{ fontSize: 48, color: '#1a5f7a' }} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5.5rem' },
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  color: '#1a5f7a',
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
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  mb: 3,
                  color: '#1a5f7a'
                }}
            >
              Culinary Excellence
            </Typography>
            <Typography
              variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  mb: 6,
                  color: '#2c3e50',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.7
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
                  variant="contained"
                  size="large"
                  sx={{
                    py: 2.5,
                    px: 6,
                    backgroundColor: '#1a5f7a',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.01em',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(26, 95, 122, 0.3)',
                    '&:hover': {
                      backgroundColor: '#0a4d68',
                      boxShadow: '0 12px 32px rgba(26, 95, 122, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>
          </Box>
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
            zIndex: 5
          }}
        >
          <Waves sx={{ color: '#1a5f7a', fontSize: 32 }} />
        </motion.div>
      </Box>

      {/* Luxury Features Section - Light & Transparent */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: '#ffffff',
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
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#1a5f7a',
                letterSpacing: '-0.02em',
                fontWeight: 600
              }}
            >
              Unparalleled Excellence
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              { icon: <Diamond />, title: 'Premium Quality', desc: 'Finest ingredients sourced globally', color: '#d4af37' },
              { icon: <Sailing />, title: 'Luxury Vessels', desc: 'Exclusive access to private yachts', color: '#1a5f7a' },
              { icon: <Waves />, title: 'Ocean Views', desc: 'Breathtaking seascapes as your backdrop', color: '#4a90a4' },
              { icon: <LocalDining />, title: 'Master Chefs', desc: 'Award-winning culinary expertise', color: '#8b7355' }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.1)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      py: 4,
                      px: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: feature.color,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                      }
                    }}
                  >
                    <Box sx={{ color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#1a5f7a',
                        mb: 1,
                        fontWeight: 400
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b6b6b',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.1rem'
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Comparison Section - Modern & Transparent */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Image with Parallax */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: 0
          }}
        >
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="Yacht Background"
            speed={0.2}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#1a5f7a',
                letterSpacing: '-0.02em',
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
                fontFamily: 'Inter, sans-serif',
                color: '#6b6b6b',
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
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Box
                    sx={{
                      backgroundColor: option.highlight 
                        ? 'rgba(255, 255, 255, 0.8)' 
                        : 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: option.highlight 
                        ? '2px solid #1a5f7a' 
                        : '1px solid rgba(26, 95, 122, 0.15)',
                      borderRadius: '20px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: option.highlight 
                          ? 'rgba(255, 255, 255, 0.9)' 
                          : 'rgba(255, 255, 255, 0.75)'
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
                          backgroundColor: '#1a5f7a',
                          color: 'white',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          zIndex: 1,
                          borderRadius: '12px'
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 5 }}>
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        {option.icon}
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: 'Inter, sans-serif',
                            color: option.color,
                            mt: 2,
                            mb: 1,
                            fontWeight: 400,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {option.title}
                        </Typography>
                        <Box sx={{ mt: 3, mb: 2 }}>
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: 'Inter, sans-serif',
                              color: option.color,
                              fontWeight: 300,
                              display: 'inline'
                            }}
                          >
                            {option.price}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'Inter, sans-serif',
                              color: '#6b6b6b',
                              ml: 1,
                              display: 'inline',
                              fontSize: '1.2rem'
                            }}
                          >
                            {option.perPerson}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ borderColor: 'rgba(26, 95, 122, 0.2)', my: 4 }} />

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
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.15rem'
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: option.color,
                                  mr: 2,
                                  flexShrink: 0
                                }}
                              />
                              <Typography
                                sx={{
                                  color: '#2c3e50',
                                  fontFamily: 'Inter, sans-serif',
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
                              backgroundColor: option.highlight ? option.color : 'transparent',
                              color: option.highlight ? 'white' : option.color,
                              borderColor: option.color,
                              borderWidth: '2px',
                              fontFamily: 'Inter, sans-serif',
                              letterSpacing: '-0.02em',
                              fontSize: '1rem',
                              borderRadius: '12px',
                              '&:hover': {
                                backgroundColor: option.color,
                                color: 'white',
                                borderColor: option.color,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 24px ${option.color}40`
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Select Package
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Elegant CTA Section - Light & Modern */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(26, 95, 122, 0.1)',
                borderRadius: '20px',
                p: { xs: 4, md: 6 }
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: '#1a5f7a',
                  mb: 3,
                  fontWeight: 500,
                  letterSpacing: '-0.02em'
                }}
              >
                Ready to Set Sail?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#6b6b6b',
                  mb: 6,
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  lineHeight: 1.7
                }}
              >
                Contact us to begin planning your extraordinary maritime dining experience. 
                Our team of experts will craft a bespoke event that exceeds all expectations.
              </Typography>
              <Link href="/contact" passHref legacyBehavior>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    py: 2.5,
                    px: 6,
                    backgroundColor: '#1a5f7a',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.01em',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(26, 95, 122, 0.3)',
                    '&:hover': {
                      backgroundColor: '#0a4d68',
                      boxShadow: '0 12px 32px rgba(26, 95, 122, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Schedule Consultation
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
