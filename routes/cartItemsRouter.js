const express = require('express');
const router = express.Router();
const { cartItemsService } = require('../services/cartItemsService')

const service = new cartItemsService();

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
        await service.deleteAllCartItems()
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
        res.json(await service.getCartItems(uid))
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting cart from database: ${err.message}`)
    }
});

router.post("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const newItem = await service.addCartItem(uid, req.body.pid, req.body.quantity);
        console.log(newItem)
        res.json({ message: 'Item added to cart', item: newItem })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error adding cart to database: ${err.message}`)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const updatedItem = await service.updateCartItem(uid, req.body.pid, req.body.quantity)
        res.json({ message: 'Cart updated', item: updatedItem })
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

