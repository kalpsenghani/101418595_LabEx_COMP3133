const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
            const users = await User.insertMany(data);
            return res.status(201).json({ message: `${users.length} users added successfully`, users });
        }

        const user = new User(data);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-__v'); 
        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
