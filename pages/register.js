import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Paper
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import TubelightNavbar from '../components/TubelightNavbar';
import AnimatedButton from '../components/AnimatedButton';
import ParallaxImage from '../components/ParallaxImage';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(name, email, password);
    if (result.success) {
      router.push('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TubelightNavbar />
      
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
          alt="Register"
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
              Sign Up
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
              Create your account to get started
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
        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(26, 95, 122, 0.2)',
                borderRadius: '20px',
                p: 4,
                mt: 4
              }}
            >
              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      fontFamily: 'Inter, sans-serif'
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      fontFamily: 'Inter, sans-serif'
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      fontFamily: 'Inter, sans-serif'
                    }
                  }}
                />
                <AnimatedButton
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    borderRadius: '10px',
                    color: '#1a5f7a'
                  }}
                >
                  Sign Up
                </AnimatedButton>
                <Box sx={{ textAlign: 'center' }}>
                  <NextLink href="/login" passHref legacyBehavior>
                    <Link
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        color: '#1a5f7a',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Already have an account? Sign In
                    </Link>
                  </NextLink>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
