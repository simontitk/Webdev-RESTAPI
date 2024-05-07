const express = require("express");
const router = express.Router();
const { userService } = require('../services/userService')

const service = new userService();

router.post("/", async (req, res) => {
    // Log in user
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await service.getUserByEmail(email);
        if (user.password === password) {
            res.json(user);
        } else {
            res.status(401).send('Invalid password');
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting users from database: ${err.message}`)
    }
});
