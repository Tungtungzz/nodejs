// controller/ProductController.js

const Product = require('../model/Product');

// Hiển thị danh sách sản phẩm
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ ProductStoreCode: -1 });
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
    try {
        const { ProductCode, ProductName, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
        const product = new Product({
            ProductCode,
            ProductName,
            ProductOriginPrice,
            Quantity,
            ProductStoreCode
        });
        await product.save();
        res.redirect('/products');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        await product.remove();
        res.redirect('/products');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
