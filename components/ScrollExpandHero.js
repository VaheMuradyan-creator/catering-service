'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function ScrollExpandHero({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title = '',
  date = '',
  scrollToExpand = '',
  textBlend = false,
  children
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Accelerate scroll after 50% progress
        const scrollMultiplier = scrollProgress < 0.5 ? 0.0015 : 0.0045; // 3x faster after 50%
        const scrollDelta = e.deltaY * scrollMultiplier;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Accelerate scroll after 50% progress for touch
        const baseFactor = deltaY < 0 ? 0.012 : 0.008;
        const scrollFactor = scrollProgress < 0.5 ? baseFactor : baseFactor * 3; // 3x faster after 50%
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        overflowX: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        {/* Original Background Image - Fades out */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            height: '100%'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollProgress }}
          transition={{ duration: 0.1 }}
        >
          <Box
            component="img"
            src={bgImageSrc}
            alt="Background"
            sx={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          />
        </motion.div>

        {/* Miami Yacht Image - Appears after first image fades out, continues as background */}
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            height: '100vh',
            width: '100vw'
          }}
          animate={{
            opacity: scrollProgress > 0.3 ? 1 : Math.min(1, (scrollProgress - 0.3) * 1.43) // Fades in after 30% scroll, stays at 1
          }}
          transition={{ duration: 0.2 }}
        >
          <Box
            component="img"
            src="/miami-bayside-landscape-yacht.avif"
            alt="Miami Yacht Background"
            sx={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </motion.div>

        <Box
          sx={{
            width: '100%',
            maxWidth: 'lg',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            zIndex: 10
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100vh',
              position: 'relative'
            }}
          >
            {/* Expanding Media */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                borderRadius: '16px',
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '95vw',
                maxHeight: '85vh',
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden'
              }}
            >
              {mediaType === 'video' ? (
                <Box sx={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <Box
                    component="video"
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                    controls={false}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '12px'
                    }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </Box>
              ) : (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Box
                    component="img"
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '12px'
                    }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </Box>
              )}

              {/* Text Overlay on Image - No grey box, just text */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  padding: '2rem'
                }}
                animate={{
                  opacity: scrollProgress < 0.4 ? Math.max(0, (scrollProgress - 0.2) * 5) : 1, // Starts fading in at 0.2, fully visible at 0.4
                  scale: scrollProgress < 0.3 ? 1 : scrollProgress < 0.5 ? Math.max(0.9, 1 - (scrollProgress - 0.3) * 0.5) : 0.9 // Shrinks until 0.5, then stops at 0.9 scale
                }}
                transition={{ duration: 0.1 }}
              >
                {date && (
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.5rem' },
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: 600,
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {date}
                  </Typography>
                )}
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2.5rem', lg: '3rem' },
                    color: 'rgba(255, 255, 255, 0.98)',
                    fontWeight: 700,
                    mb: 3,
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 2px 15px rgba(0,0,0,0.7)',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {title || 'Maritime Culinary Excellence'}
                </Typography>
                {scrollToExpand && (
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 1px 5px rgba(0,0,0,0.7)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ↓ {scrollToExpand} ↓
                  </Typography>
                )}
              </motion.div>
            </Box>

            {/* Title Text */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 2,
                width: '100%',
                position: 'relative',
                zIndex: 10,
                flexDirection: 'column',
                mixBlendMode: textBlend ? 'difference' : 'normal'
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  color: '#ffffff',
                  transform: `translateX(-${textTranslateX}vw)`,
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                {firstWord}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: `translateX(${textTranslateX}vw)`,
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                {restOfTitle}
              </Typography>
            </Box>
          </Box>

          {/* Content Section */}
          <motion.section
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              px: { xs: 2, md: 4 },
              py: { xs: 5, md: 10 }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.section>
        </Box>
      </Box>
    </Box>
  );
}
