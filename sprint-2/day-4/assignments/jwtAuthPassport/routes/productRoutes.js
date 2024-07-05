const express = require('express');
const passport = require('passport');
const Product = require('../models/productModel'); // Assuming you have a Product model

const router = express.Router();

// Public Route: Homepage (Example)
router.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

// Protected Routes
router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/products', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { name, description, price, category, image } = req.body;
  try {
    const product = new Product({ name, description, price, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.put('/products/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category, image }, { new: true });
    if (!product) return res.status(404).send('Product not found.');
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/products/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send('Product not found.');
    res.status(200).send('Product deleted.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;