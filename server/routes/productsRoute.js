const router = require('express').Router();
const Product = require('../models/productModel');
const authMiddleware = require('../middlewares/authMiddleware');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');

router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.send({
            success: true,
            message: 'Product added',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

router.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            products,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.put('/edit-product/:id', authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: 'Product updated',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.delete('/delete-product/:id', authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: 'Product deleted',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

router.post('/upload-image-to-product', authMiddleware, multer({ storage: storage }).single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'marketplace'
        });
        
        const productId = req.body.productId;
        await Product.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url },
        });
        res.send({
            success: true,
            message: "Image uploaded",
            result,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;