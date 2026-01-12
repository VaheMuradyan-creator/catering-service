import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Rating,
  Divider,
  TextField,
  Dialog,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const menuItems = {
  appetizers: [
    { name: 'Bread Platter', price: 15 },
    { name: 'Assorted Cheeses', price: 25 },
    { name: 'Assorted Cold Cuts', price: 30 },
    { name: 'Basturma Sujuk', price: 35 },
    { name: 'Hummus (18 oz)', price: 12 },
    { name: 'Armenian Salsa (18 oz)', price: 12 },
    { name: 'Olives (18 oz)', price: 10 }
  ],
  // ... rest of menuItems remain the same
};

const buttonStyle = {
  color: 'black',
  border: '2px solid black',
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
    border: '2px solid black'
  }
};

const Package = ({ title, basePrice, servings, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(basePrice);

  const handleQuantityChange = (itemName, change) => {
    const newQuantities = {
      ...quantities,
      [itemName]: Math.max(0, (quantities[itemName] || 0) + change)
    };
    setQuantities(newQuantities);
    
    const itemsTotal = Object.entries(newQuantities).reduce((sum, [name, qty]) => {
      const item = [...Object.values(menuItems)].flat().find(i => i.name === name);
      return sum + (item?.price || 0) * qty;
    }, basePrice);
    
    setTotal(itemsTotal);
  };

  const handleAddToCart = () => {
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => {
        const item = [...Object.values(menuItems)].flat().find(i => i.name === name);
        return { name, quantity: qty, price: item.price };
      });

    onAddToCart({
      packageTitle: title,
      basePrice,
      items,
      total
    });
    setIsOpen(false);
  };

  const closedCard = (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
        height: '100%'
      }}
      onClick={() => setIsOpen(true)}
    >
      <Box
        component="img"
        src={title.includes("10") ? "/package-10.jpg" : "/package-15.jpg"}
        alt={title}
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover'
        }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Rating value={5} readOnly />
        <Typography variant="subtitle1" color="text.secondary">
          Serves {servings} people
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          Starting at ${basePrice}
        </Typography>
        <Button 
          variant="outlined"
          fullWidth
          sx={{ 
            mt: 2,
            ...buttonStyle
          }}
        >
          Customize Package
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      {closedCard}
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: 'relative', p: 3 }}>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Rating value={5} readOnly />
          <Typography variant="subtitle1" color="text.secondary">
            Serves {servings} people
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Total: ${total}
          </Typography>

          {Object.entries(menuItems).map(([category, items]) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                {category}
              </Typography>
              <Grid container spacing={2}>
                {items.map((item) => (
                  <Grid item xs={12} key={item.name}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      py: 1
                    }}>
                      <Typography>{item.name} - ${item.price}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.name, -1)}
                          disabled={!quantities[item.name]}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          size="small"
                          value={quantities[item.name] || 0}
                          InputProps={{ readOnly: true }}
                          sx={{ width: 60, mx: 1 }}
                        />
                        <IconButton 
                          onClick={() => handleQuantityChange(item.name, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined"
              onClick={() => setIsOpen(false)}
              sx={buttonStyle}
            >
              Cancel
            </Button>
            <Button 
              variant="outlined"
              onClick={handleAddToCart}
              sx={buttonStyle}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const Cart = ({ items, open, onClose, onCheckout, onRemoveItem }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 350, p: 3 }}>
      <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
      <List>
        {items.map((item, index) => (
          <ListItem 
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => onRemoveItem(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.packageTitle}
              secondary={
                <>
                  <Typography variant="body2">Base Price: ${item.basePrice}</Typography>
                  {item.items.map((menuItem, i) => (
                    <Typography key={i} variant="body2">
                      {menuItem.name} x{menuItem.quantity} - ${menuItem.price * menuItem.quantity}
                    </Typography>
                  ))}
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Total: ${item.total}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      {items.length > 0 && (
        <Button
          variant="outlined"
          fullWidth
          onClick={onCheckout}
          sx={{ 
            mt: 2,
            ...buttonStyle
          }}
        >
          Proceed to Checkout
        </Button>
      )}
    </Box>
  </Drawer>
);

const Catering = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
  };

  return (
    <Box sx={{ pt: 10, pb: 8, backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography variant="h2">
            Catering Packages
          </Typography>
          <IconButton onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Package 
              title="10 Person Special Package" 
              basePrice={299} 
              servings={10}
              onAddToCart={handleAddToCart}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Package 
              title="15 Person Special Package" 
              basePrice={399} 
              servings={15}
              onAddToCart={handleAddToCart}
            />
          </Grid>
        </Grid>
      </Container>

      <Cart 
        items={cartItems}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onRemoveItem={handleRemoveItem}
      />
    </Box>
  );
};

export default Catering;