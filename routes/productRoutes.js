const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// 🆕 Use multer for file upload
router.post('/', upload.single('image'), createProduct);

router.get('/', getProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
