// routes/index.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const methodOverride = require('method-override');

// Sử dụng methodOverride để hỗ trợ DELETE
router.use(methodOverride('_method'));

// Hiển thị danh sách sản phẩm
router.get('/products', productController.getProducts);

// Hiển thị form thêm sản phẩm mới
router.get('/products/new', productController.newProductForm);

// Thêm sản phẩm mới
router.post('/products', productController.addProduct);

// Xóa sản phẩm
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
