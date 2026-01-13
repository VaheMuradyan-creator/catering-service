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
        const scrollDelta = e.deltaY * 0.0015;
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
        const scrollFactor = deltaY < 0 ? 0.012 : 0.008;
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
        {/* Background Image */}
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

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 10,
                  mt: 2
                }}
              >
                {date && (
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      transform: `translateX(-${textTranslateX}vw)`
                    }}
                  >
                    {date}
                  </Typography>
                )}
                {scrollToExpand && (
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500,
                      textAlign: 'center',
                      transform: `translateX(${textTranslateX}vw)`
                    }}
                  >
                    {scrollToExpand}
                  </Typography>
                )}
              </Box>
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
                  color: 'rgba(255, 255, 255, 0.95)',
                  transform: `translateX(-${textTranslateX}vw)`,
                  fontFamily: 'Inter, sans-serif'
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
                  color: 'rgba(255, 255, 255, 0.95)',
                  transform: `translateX(${textTranslateX}vw)`,
                  fontFamily: 'Inter, sans-serif'
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
