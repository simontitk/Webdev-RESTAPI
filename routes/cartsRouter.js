const express = require('express');
const router = express.Router();
const { cartsService } = require('../services/cartsService')

const service = new cartsService();

router.get("/", async (req, res) => {
    // Read all carts
    try {
        res.json(await service.getAllCartItems())
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting carts from database: ${err.message}`)
    }
});


router.delete("/", async (req, res) => {
    // Delete all carts
    try {
        await service.deleteAllCarts()
        res.json({ message: 'All carts deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting all carts: ${err.message}`)
    }
});

router.get("/:id", async (req, res) => {
    // Read cart of user @ uid
    try {
        const uid = parseInt(req.params.id);
        res.json(await service.getCart(uid))
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting cart from database: ${err.message}`)
    }
});

router.post("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        await service.addCartItem(uid, req.body.pid, req.body.quantity);
        res.json({ message: 'Cart added to database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error adding cart to database: ${err.message}`)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        await service.updateCart(uid, req.body.pid, req.body.quantity)
        res.json({ message: 'Cart updated' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error updating cart: ${err.message}`)
    }
});

router.delete("/:id", async (req, res) => {
    // Delete item from cart of user @ uid
    try {
        const uid = parseInt(req.params.id);
        await service.deleteCartItem(uid, req.body.pid);
        res.json({ message: 'Product deleted from cart' })

    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting cart: ${err.message}`)
    }
});


module.exports = router;

