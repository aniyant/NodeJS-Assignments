const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
    const { name, minPrice, maxPrice, page, limit } = req.query;
    const where = {};
    
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    const limitValue = pageSize;
    
    try {
      const products = await Product.findAndCountAll({
        where,
        limit: limitValue,
        offset
      });
      res.json({
        totalItems: products.count,
        totalPages: Math.ceil(products.count / pageSize),
        currentPage: pageNumber,
        data: products.rows
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ "message": 'Product deleted successfully'});
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
router.get('/', async (req, res) => {
    const { name, minPrice, maxPrice, page, limit } = req.query;
    const where = {};
    
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    const limitValue = pageSize;
    
    try {
      const products = await Product.findAndCountAll({
        where,
        limit: limitValue,
        offset
      });
      res.json({
        totalItems: products.count,
        totalPages: Math.ceil(products.count / pageSize),
        currentPage: pageNumber,
        data: products.rows
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  