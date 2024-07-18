// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/productManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB: '));
db.once('open', () => {
    console.log('Đã kết nối đến MongoDB');
});

// Sử dụng bodyParser và methodOverride
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sử dụng routes
app.use('/', require('./routes'));

// Thiết lập view engine là EJS và đường dẫn views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Thiết lập public folder cho các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên http://localhost:${PORT}`);
});
