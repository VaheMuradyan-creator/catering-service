'use client';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedButton({ children, sx = {}, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <Button
        {...props}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          color: '#1a5f7a',
          border: '1px solid rgba(26, 95, 122, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          ...sx,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            ...sx['&:hover']
          }
        }}
      >
        {children}
        {isHovered && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(26, 95, 122, 0.3) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                filter: 'blur(20px)'
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(26, 95, 122, 0.2) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                filter: 'blur(15px)'
              }}
            />
          </>
        )}
      </Button>
    </motion.div>
  );
}
