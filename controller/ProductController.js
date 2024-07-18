// controller/ProductController.js

const Product = require('../model/Product');

// Hiển thị danh sách sản phẩm
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hiển thị form thêm sản phẩm mới
exports.newProductForm = (req, res) => {
    res.render('new');
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
    const newProduct = new Product({
        ProductCode,
        ProductName,
        ProductDate,
        ProductOriginPrice,
        Quantity,
        ProductStoreCode
    });
    try {
        await newProduct.save();
        res.redirect('/products');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.findByIdAndDelete(productId);
        res.redirect('/products');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
