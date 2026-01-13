import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(20px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        height: '60px'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            py: 0,
            minHeight: '60px !important',
            height: '60px',
            display: 'flex',
            width: '100%'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Link href="/" passHref legacyBehavior>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                  <Button
                  sx={{
                    color: 'white',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    ml: 0,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.02em',
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  Maritime
                </Button>
              </motion.div>
            </Link>
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1
          }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref legacyBehavior>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    sx={{
                      color: 'white',
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      px: 2,
                      py: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              </Link>
            ))}
            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleLogout}
                  sx={{
                    color: 'white',
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }
                  }}
                >
                  Logout
                </Button>
              </motion.div>
            ) : (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      sx={{
                        color: 'white',
                        fontSize: '0.9rem',
                        textTransform: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        px: 2,
                        py: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      sx={{
                        color: 'white',
                        fontSize: '0.9rem',
                        textTransform: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-1px)'
                        }
                      }}
                    >
                      Sign Up
                    </Button>
                  </motion.div>
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
