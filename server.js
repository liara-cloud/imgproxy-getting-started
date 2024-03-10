const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('myImage');

app.set('view engine', 'ejs');

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

app.get('/images', (req, res) => {
    fs.readdir('./public/uploads', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const imageFiles = files.filter(file => {
            const extname = path.extname(file);
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
        });

        res.render('images', { images: imageFiles });
    });
});

app.get('/', (req, res) => res.render('index', { msg: null }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use('/public/uploads', express.static('./public/uploads'));