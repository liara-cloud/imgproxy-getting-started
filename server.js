const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// تنظیمات آپلود با Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('myImage');

// استفاده از موتور قالب EJS برای نمایش عکس‌ها
app.set('view engine', 'ejs');

// آپلود عکس
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.redirect('/images');
            }
        }
    });
});

// نمایش عکس‌های آپلود شده
app.get('/images', (req, res) => {
    // خواندن لیست فایل‌های موجود در پوشه uploads
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // فیلتر کردن فقط فایل‌های تصویری
        const imageFiles = files.filter(file => {
            const extname = path.extname(file);
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
        });

        // ارسال لیست عکس‌های آپلود شده به قالب برای نمایش
        res.render('images', { images: imageFiles });
    });
});

// صفحه اصلی
app.get('/', (req, res) => res.render('index', { msg: null }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
