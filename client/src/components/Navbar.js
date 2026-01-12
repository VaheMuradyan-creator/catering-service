 import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const buttonStyle = {
    color: 'black',
    mx: 2,
    fontFamily: 'Playfair Display, serif',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          py: 1,
          display: 'flex',
          width: '100%'
        }}>
          <Box sx={{ flex: 1 }}>
            <Button
              component={Link}
              to="/catering"
              sx={{
                ...buttonStyle,
                fontSize: '1.5rem',
                textTransform: 'none',
                ml: 0
              }}
            >
              Catering Service
            </Button>
          </Box>
          
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}>
            <Button 
              component={Link} 
              to="/"
              sx={buttonStyle}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/about"
              sx={buttonStyle}
            >
              About Us
            </Button>
            <Button 
              component={Link} 
              to="/contact"
              sx={buttonStyle}
            >
              Contact
            </Button>
            {user ? (
              <Button 
                onClick={handleLogout}
                sx={buttonStyle}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login"
                  sx={buttonStyle}
                >
                  Sign In
                </Button>
                <Button 
                  component={Link} 
                  to="/register"
                  sx={buttonStyle}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
