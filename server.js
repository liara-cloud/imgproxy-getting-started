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


const ENDPOINT_URL = process.env.ENDPOINT_URL;
const IMGPROXY_URL = process.env.IMGPROXY_URL;

const img_proxy_conf = {
    "signature": "_",
    "options": "resize:fill:300:400:0",
    "gravity": "gravity:sm"
};

const imgproxy_conf = `${IMGPROXY_URL}/${img_proxy_conf.signature}/${img_proxy_conf.options}/${img_proxy_conf.gravity}/plain/`;

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

        const processedImages = imageFiles.map(image => {
            const temp = `${ENDPOINT_URL}/public/uploads/${image}`;
            return `${imgproxy_conf}${temp}`;
        });

        processedImages.forEach(image => {
            console.log(image);
        });

        res.render('images', { images: processedImages });
    });
});

app.get('/', (req, res) => res.render('index', { msg: null }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use('/public/uploads', express.static('./public/uploads'));