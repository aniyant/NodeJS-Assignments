const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
