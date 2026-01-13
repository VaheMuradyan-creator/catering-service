import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Divider, Chip } from '@mui/material';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImage from '../components/ParallaxImage';
import TubelightNavbar from '../components/TubelightNavbar';
import AnimatedButton from '../components/AnimatedButton';
import ScrollExpandHero from '../components/ScrollExpandHero';
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
      <TubelightNavbar />
      
      {/* Scroll Expansion Hero */}
      <ScrollExpandHero
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1280&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        title="Maritime Culinary Excellence"
        date="Luxury Catering"
        scrollToExpand="Scroll to Explore"
        textBlend={false}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                color: '#1a5f7a',
                mb: 3
              }}
            >
              Where the Ocean Meets Extraordinary Cuisine
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem',
                color: '#6b6b6b',
                lineHeight: 1.8,
                mb: 4
              }}
            >
              Experience luxury catering aboard private yachts, creating unforgettable moments on the open sea. 
              Our commitment to excellence ensures every detail is meticulously curated, from gourmet menus to impeccable service.
            </Typography>
            <Link href="/packages" passHref legacyBehavior>
              <AnimatedButton
                size="large"
                sx={{
                  py: 2.5,
                  px: 6,
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  borderRadius: '10px'
                }}
              >
                Explore Our Services
              </AnimatedButton>
            </Link>
          </Box>
        </Container>
      </ScrollExpandHero>

      {/* Luxury Features Section - Light & Transparent */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
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
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.2)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      py: 4,
                      px: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: feature.color,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
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
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            zIndex: 0
          }
        }}
      >

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
                        ? 'rgba(255, 255, 255, 0.4)' 
                        : 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(20px)',
                      border: option.highlight 
                        ? '2px solid #1a5f7a' 
                        : '1px solid rgba(26, 95, 122, 0.3)',
                      borderRadius: '20px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: option.highlight 
                          ? 'rgba(255, 255, 255, 0.5)' 
                          : 'rgba(255, 255, 255, 0.4)'
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
                          <AnimatedButton
                            fullWidth
                            sx={{
                              py: 2,
                              px: 4,
                              borderColor: option.color,
                              borderWidth: '2px',
                              fontFamily: 'Inter, sans-serif',
                              letterSpacing: '-0.02em',
                              fontSize: '1rem',
                              borderRadius: '12px',
                              color: option.color
                            }}
                          >
                            Select Package
                          </AnimatedButton>
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
          position: 'relative',
          overflow: 'hidden',
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(26, 95, 122, 0.15)',
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
                <AnimatedButton
                  size="large"
                  sx={{
                    py: 2.5,
                    px: 6,
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    borderRadius: '10px'
                  }}
                >
                  Schedule Consultation
                </AnimatedButton>
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
