import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import ParallaxImage from '../components/ParallaxImage';
import TubelightNavbar from '../components/TubelightNavbar';

export default function About() {
  const teamMembers = [
    {
      name: "James Mitchell",
      role: "Executive Chef",
      image: "/chef1.jpg",
      description: "With over 15 years of experience in fine dining"
    },
    {
      name: "Ani Muradyan",
      role: "Event Coordinator",
      image: "/coordinator.jpg",
      description: "Specializes in creating unforgettable experiences"
    },
    {
      name: "Sarah Williams",
      role: "Pastry Chef",
      image: "/chef2.jpg",
      description: "Award-winning dessert specialist"
    }
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TubelightNavbar />
      {/* Hero Section */}
      <Box
        sx={{
          height: '50vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <ParallaxImage 
          src="/pexels-asadphoto-11340077.jpg" 
          alt="About Us"
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
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              maxWidth: '800px',
              mx: 'auto'
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
              About Us
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
              Crafting extraordinary maritime dining experiences
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          position: 'relative',
          backgroundImage: 'url(/pexels-asadphoto-28408327.jpg)',
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
                mb: 6,
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#1a5f7a',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Our Story
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                mb: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem',
                color: '#6b6b6b',
                lineHeight: 1.8,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              With a passion for culinary excellence and a love for the ocean, we bring together 
              the finest cuisine and breathtaking maritime settings. Our team of expert chefs and 
              event coordinators work tirelessly to create unforgettable experiences that combine 
              luxury, elegance, and the natural beauty of the sea.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.2)',
                      borderRadius: '20px',
                      textAlign: 'center',
                      p: 4,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                      }
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        border: '3px solid #1a5f7a'
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#1a5f7a',
                        mb: 1,
                        fontWeight: 600
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#1a5f7a',
                        mb: 2,
                        fontWeight: 500
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#6b6b6b',
                        fontSize: '1rem'
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
