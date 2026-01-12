import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const router = useRouter();

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
    router.push('/');
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
            <Link href="/" passHref legacyBehavior>
              <Button
                sx={{
                  ...buttonStyle,
                  fontSize: '1.5rem',
                  textTransform: 'none',
                  ml: 0
                }}
              >
                Catering Service
              </Button>
            </Link>
          </Box>
          
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}>
            <Link href="/" passHref legacyBehavior>
              <Button sx={buttonStyle}>
                Home
              </Button>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <Button sx={buttonStyle}>
                About Us
              </Button>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Button sx={buttonStyle}>
                Contact
              </Button>
            </Link>
            {user ? (
              <Button 
                onClick={handleLogout}
                sx={buttonStyle}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Button sx={buttonStyle}>
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Button sx={buttonStyle}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
