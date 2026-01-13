'use client';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export default function FloatingBoat({ src, alt = 'Luxury Yacht' }) {
  return (
    <Box
      component={motion.div}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      sx={{
        position: 'absolute',
        width: { xs: '200px', md: '400px' },
        height: 'auto',
        bottom: { xs: '10%', md: '15%' },
        right: { xs: '5%', md: '10%' },
        zIndex: 3,
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
    </Box>
  );
}
