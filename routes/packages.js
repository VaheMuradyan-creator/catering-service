const express = require('express');
const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = [
      {
        id: 1,
        name: 'Classic Package',
        description: 'Perfect for corporate events and casual gatherings',
        price: 35,
        min_guests: 30,
        max_guests: 100,
        image_url: '/images/classic-package.jpg',
        menu_items: {
          appetizers: ['Bruschetta', 'Mini Quiches', 'Stuffed Mushrooms'],
          mains: ['Grilled Chicken', 'Roasted Vegetables', 'Pasta Primavera'],
          desserts: ['Chocolate Cake', 'Fresh Fruit Tart']
        }
      },
      {
        id: 2,
        name: 'Premium Package',
        description: 'Ideal for weddings and upscale events',
        price: 55,
        min_guests: 50,
        max_guests: 200,
        image_url: '/images/premium-package.jpg',
        menu_items: {
          appetizers: ['Shrimp Cocktail', 'Smoked Salmon Canapés', 'Gourmet Cheese Board'],
          mains: ['Prime Rib', 'Grilled Salmon', 'Vegetarian Wellington'],
          desserts: ['Wedding Cake', 'Chocolate Fountain', 'Petit Fours']
        }
      },
      {
        id: 3,
        name: 'Gourmet Package',
        description: 'The ultimate fine dining experience',
        price: 75,
        min_guests: 20,
        max_guests: 100,
        image_url: '/images/gourmet-package.jpg',
        menu_items: {
          appetizers: ['Foie Gras', 'Oysters Rockefeller', 'Caviar Service'],
          mains: ['Wagyu Beef', 'Lobster Thermidor', 'Truffle Risotto'],
          desserts: ['Crème Brûlée', 'Soufflé', 'Artisanal Ice Cream']
        }
      }
    ];
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching packages' });
  }
});

// Get a specific package by ID
router.get('/:id', async (req, res) => {
  try {
    const packageId = parseInt(req.params.id);
    const package = packages.find(p => p.id === packageId);
    
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching package' });
  }
});

module.exports = router;