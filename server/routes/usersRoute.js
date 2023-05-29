const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            throw new Error('User with this email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: 'New user created'
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (!user) {
            throw new Error('User with such email wasnt found');
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            throw new Error('Wrong password or email');
        }

        const token = jwt.sign({userId: user._id}, process.env.jwt_secret, { expiresIn: "1d"});

        res.send({
            success: true,
            message: 'User logged',
            data: token
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;