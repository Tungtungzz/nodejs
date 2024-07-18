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
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Sử dụng bodyParser và methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Thiết lập các cài đặt EJS và thư mục public
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng route từ routes/index.js
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
