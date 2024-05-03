const express = require("express");
const router = express.Router();
const { userService } = require('../services/userService')

const service = new userService();

router.get("/", async (req, res) => {
    // Get all users
    try {
        if (req.query.email) {
            const email = req.query.email;
            res.json(await service.getUserByEmail(email))
        } else {
            res.json(await service.getAllUsers())
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting users from database: ${err.message}`)
    }
});

router.get("/:id", async (req, res) => {
    // Get user with specific @ uid
    try {
        const id = parseInt(req.params.id);
        res.json(await service.getUser(id))
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting User from database: ${err.message}`)
    }
});

router.post("/", async (req, res) => {
    // Create a new user
    const { first_name, last_name, email, phone, city, street, password, payment_method } = req.body;

    try {
        await service.createUser(
            first_name,
            last_name,
            email,
            phone,
            city,
            street,
            password,
            payment_method
        );
        res.json({ message: 'User added to database' });
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error addding user to database: ${err.message}`)
    }
});

router.put("/:id", async (req, res) => {
    // Update information of user @ uid
    try {
        const id = parseInt(req.params.id);
        const { first_name, last_name, email, phone, city, street, password, payment_method } = req.body;
        await service.updateUser(
            id,
            first_name,
            last_name,
            email,
            phone,
            city,
            street,
            password,
            payment_method
        );
        res.json({ message: 'User information updated' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error updating user information: ${err.message}`)
    }
});

router.delete("/", async (req, res) => {
    // Delete all Users
    try {
        await service.deleteAllUsers()
        res.json({ message: 'All Users deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting all Users: ${err.message}`)
    }
});

router.delete("/:id", async (req, res) => {
    // Delete User with @ uid
    try {
        const id = parseInt(req.params.id);
        await service.deleteUser(id);
        res.json({ message: 'User deleted from database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting User: ${err.message}`)
    }
});


module.exports = router;