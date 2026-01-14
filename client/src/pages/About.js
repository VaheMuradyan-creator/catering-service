import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Executive Chef",
      image: "/chef1.jpg",
      description: "With over 15 years of experience in fine dining"
    },
    {
      name: "Maria Garcia",
      role: "Event Coordinator",
      image: "/coordinator.jpg",
      description: "Specializes in creating unforgettable experiences"
    },
    {
      name: "David Chen",
      role: "Pastry Chef",
      image: "/chef2.jpg",
      description: "Award-winning dessert specialist"
    }
  ];

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          backgroundImage: 'url("/pexels-adriendrj-33980501.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            color: 'white'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="h5">
              Crafting Culinary Excellence Since 2010
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" gutterBottom>
                Our Mission
              </Typography>
              <Typography paragraph>
                To deliver exceptional catering experiences that exceed expectations, using the finest ingredients and innovative culinary techniques. We believe that every event deserves memorable food that brings people together.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/pexels-asadphoto-11340077.jpg"
              alt="Our Mission"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ backgroundColor: '#f8f8f8', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={member.image}
                        sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h5" gutterBottom>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;