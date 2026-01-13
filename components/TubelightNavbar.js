'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Info, ContactMail, Login, PersonAdd, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function TubelightNavbar() {
  const [activeTab, setActiveTab] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Contact', url: '/contact', icon: ContactMail }
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pt: 2,
        display: { xs: 'none', sm: 'block' }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          py: 0.5,
          px: 1,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.url;

          return (
            <Link key={item.name} href={item.url} passHref legacyBehavior>
              <Button
                onClick={() => setActiveTab(item.url)}
                sx={{
                  position: 'relative',
                  color: isActive ? '#1a5f7a' : 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#1a5f7a'
                  }
                }}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>{item.name}</Box>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Icon sx={{ fontSize: 18 }} />
                </Box>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50px',
                      backgroundColor: 'rgba(26, 95, 122, 0.1)',
                      zIndex: -1
                    }}
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 32,
                        height: 4,
                        backgroundColor: '#1a5f7a',
                        borderRadius: '4px 4px 0 0',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          width: 48,
                          height: 24,
                          backgroundColor: 'rgba(26, 95, 122, 0.2)',
                          borderRadius: '50%',
                          top: -8,
                          left: -8,
                          filter: 'blur(8px)'
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: 32,
                          height: 24,
                          backgroundColor: 'rgba(26, 95, 122, 0.2)',
                          borderRadius: '50%',
                          top: -4,
                          left: 0,
                          filter: 'blur(8px)'
                        }
                      }}
                    />
                  </motion.div>
                )}
              </Button>
            </Link>
          );
        })}
        {user ? (
          <Button
            onClick={handleLogout}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: '50px',
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#1a5f7a'
              }
            }}
          >
            <Logout sx={{ fontSize: 18, mr: { md: 1 } }} />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Logout</Box>
          </Button>
        ) : (
          <>
            <Link href="/login" passHref legacyBehavior>
              <Button
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#1a5f7a'
                  }
                }}
              >
                <Login sx={{ fontSize: 18, mr: { md: 1 } }} />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Sign In</Box>
              </Button>
            </Link>
            <Link href="/register" passHref legacyBehavior>
              <Button
                sx={{
                  color: '#1a5f7a',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                <PersonAdd sx={{ fontSize: 18, mr: { md: 1 } }} />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>Sign Up</Box>
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}
