import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <Box sx={{ py: 8, backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <Container>
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            mb: 6,
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Catering Packages
        </Typography>
        
        <Grid container spacing={4}>
          {packages.map((pkg) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pkg.image}
                  alt={pkg.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {pkg.name}
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    ${pkg.price}{pkg.perPerson ? ' per person' : ''}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {pkg.description}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Minimum {pkg.minGuests} guests
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {Object.entries(pkg.menuItems).map(([category, items]) => (
                    <Box key={category} sx={{ mb: 2 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          mb: 1
                        }}
                      >
                        {category.replace(/([A-Z])/g, ' $1').trim()}:
                      </Typography>
                      <List dense>
                        {items.map((item, index) => (
                          <ListItem key={index} sx={{ py: 0 }}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Link href={`/order/${pkg.id}`} passHref legacyBehavior>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: '#d4af37',
                        '&:hover': {
                          backgroundColor: '#b4941f'
                        }
                      }}
                    >
                      Select Package
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
