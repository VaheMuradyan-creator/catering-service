import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ParallaxImage from '../components/ParallaxImage';

const packages = [
  {
    id: 1,
    name: 'Classic Package',
    price: 35,
    perPerson: true,
    minGuests: 30,
    image: '/classic-package.jpg',
    description: 'Perfect for corporate events and casual gatherings',
    menuItems: {
      mainCourse: [
        'Grilled Chicken Breast with Herbs',
        'Pan-Seared Salmon with Lemon Butter',
        'Vegetarian Pasta Primavera'
      ],
      sides: [
        'Roasted Seasonal Vegetables',
        'Garlic Mashed Potatoes',
        'Mixed Green Salad'
      ],
      desserts: [
        'Assorted Mini Desserts',
        'Fresh Fruit Platter'
      ]
    }
  },
  {
    id: 2,
    name: 'Premium Package',
    price: 55,
    perPerson: true,
    minGuests: 40,
    image: '/premium-package.jpg',
    description: 'Ideal for weddings and upscale events',
    menuItems: {
      appetizers: [
        'Shrimp Cocktail',
        'Bruschetta',
        'Cheese and Charcuterie Board'
      ],
      mainCourse: [
        'Filet Mignon with Red Wine Reduction',
        'Lobster Tail with Drawn Butter',
        'Grilled Vegetable Wellington'
      ],
      sides: [
        'Truffle Mashed Potatoes',
        'Grilled Asparagus',
        'Caesar Salad'
      ],
      desserts: [
        'Chocolate Lava Cake',
        'Crème Brûlée',
        'Assorted Petit Fours'
      ]
    }
  },
  {
    id: 3,
    name: 'Luxury Package',
    price: 85,
    perPerson: true,
    minGuests: 50,
    image: '/luxury-package.jpg',
    description: 'The ultimate fine dining experience',
    menuItems: {
      appetizers: [
        'Caviar Service',
        'Foie Gras',
        'Oysters Rockefeller'
      ],
      mainCourse: [
        'Wagyu Beef Tenderloin',
        'Chilean Sea Bass',
        'Truffle Risotto'
      ],
      sides: [
        'Lobster Mac and Cheese',
        'Roasted Brussels Sprouts with Pancetta',
        'Heirloom Tomato Salad'
      ],
      desserts: [
        'Grand Dessert Display',
        'French Macarons',
        'Artisanal Cheese Selection'
      ]
    }
  }
];

export default function Packages() {
  const router = useRouter();

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
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
          alt="Packages"
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
              Our Packages
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
              Choose the perfect package for your event
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Packages Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
        <Container>
          <Grid container spacing={4}>
            {packages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={pkg.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(26, 95, 122, 0.15)',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: '#1a5f7a',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 8px 32px rgba(26, 95, 122, 0.15)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={pkg.image}
                      alt={pkg.name}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          color: '#1a5f7a',
                          mb: 1
                        }}
                      >
                        {pkg.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#1a5f7a',
                          mb: 2,
                          fontWeight: 500
                        }}
                      >
                        ${pkg.price}{pkg.perPerson ? ' per person' : ''}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#6b6b6b',
                          mb: 3,
                          fontSize: '1rem'
                        }}
                      >
                        {pkg.description}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: 'Inter, sans-serif',
                          color: '#6b6b6b',
                          mb: 3
                        }}
                      >
                        Minimum {pkg.minGuests} guests
                      </Typography>
                      
                      <Divider sx={{ borderColor: 'rgba(26, 95, 122, 0.1)', my: 3 }} />
                      
                      {Object.entries(pkg.menuItems).map(([category, items]) => (
                        <Box key={category} sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 600,
                              color: '#1a5f7a',
                              mb: 1,
                              textTransform: 'capitalize'
                            }}
                          >
                            {category.replace(/([A-Z])/g, ' $1').trim()}:
                          </Typography>
                          <List dense>
                            {items.map((item, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemText
                                  primary={item}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      fontFamily: 'Inter, sans-serif',
                                      fontSize: '0.9rem',
                                      color: '#6b6b6b'
                                    }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))}
                    </CardContent>
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Link href={`/order/${pkg.id}`} passHref legacyBehavior>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: '#1a5f7a',
                            color: 'white',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            borderRadius: '10px',
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: '#0a4d68',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 24px rgba(26, 95, 122, 0.3)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Select Package
                        </Button>
                      </Link>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
