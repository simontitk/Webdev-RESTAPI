const express = require('express');
const router = express.Router();

const {usersService} = require('../services/service')
const service = new usersService();

router.get("/", async(req, res) => {
// Get all users
    try {
        res.json(await service.getAllUsers())
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting users from database: ${err.message}`)
    }
});

router.post("/:id", async (req, res) => {
    // Create a new user
    try {
        const id = parseInt(req.params.id);
        await service.createUser(id, req.body.pid, req.body.quantity)
        res.json({ message: 'User added to database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error addding user to database: ${err.message}`)
    }
});

router.put("/", async(req, res) => {
    // Update information of user @ uid
    try {
        const id = parseInt(req.params.id);
        await service.updateUser(id, req.body.pid, req.body.quantity)
        res.json({ message: 'User information updated' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error updating user information: ${err.message}`)
    }
});

router.delete("/", async(req, res) => {
    // Delete all Users
    try {
        await service.deleteAllUsers()
        res.json({ message: 'All Users deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting all Users: ${err.message}`)
    }
});

router.get("/:id", async(req, res) => {
// Get user with specific @ uid
    try {
        const id = parseInt(req.params.id);
        res.json(await service.getUser(id))
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting User from database: ${err.message}`)
    }
});

router.delete("/:id", async(req, res) => {
    // Delete User with @ uid
    try {
        const uid = parseInt(req.params.id);
        console.log(req.body)
            await service.deleteUser(uid);
            res.json({ message: 'User deleted from database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting User: ${err.message}`)
    }
});

module.exports = router;