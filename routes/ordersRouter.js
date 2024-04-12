const express = require('express');
const router = express.Router();
const { ordersService } = require('../services/ordersService');

const service = new ordersService();

router.get("/", async (req, res) => {
    try {
        const orders = await service.getAllOrders();
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting orders from database: ${err.message}`);
    }
});



router.post("/user/:id", async (req, res) => {

    /* the endpoint expects an array of product objects and quantities
    ie [{product: {...}: 1, quantity: 10}, {product: {...}, quantity: 3}] */
    
    const uid = parseInt(req.params.id);
    const { productQuantites } = req.body;

    const totalPrice = productQuantites
        .map(pq => pq.product.price * pq.quantity)
        .reduce((sum, price) => sum + price, 0);

    const products = productQuantites
        .map(pq => ({pid: pq.product.id, quantity: pq.quantity}));

    try {
        const order = await service.createOrder(uid, totalPrice, products);
        res.json({ message: 'Order added to database.', order: order })
    } 
    catch (err) {
        console.error(err)
        res.status(500).send(`Error adding order to database: ${err.message}`)
    }
});


router.delete("/", async (req, res) => {
    try {
        const deletedOrders = await service.deleteAllOrders();
        res.json({ message: `${deletedOrders} order(s) deleted.` })
    } 
    catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting orders from database: ${err.message}`)    
    }
});



router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const order = await service.getOrder(id)
        res.json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting order from database: ${err.message}`);
    }
});


router.delete("/:id", async (req, res) => {
    const oid = parseInt(req.params.id);
    try {
        const deletedOrder = await service.deleteOrder(oid);
        res.json({ message: "Deleted order from database." });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting order from database: ${err.message}`);
    }
});


router.get("/user/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const orders = await service.getUserOrders(uid);
        res.json(orders);    
    } 
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting orders from database: ${err.message}`);
    }
});


router.delete("/user/:id", async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const deletedUserOrders = await service.deleteUserOrders(uid);
        res.json({ message: `${deletedUserOrders} order(s) deleted.` });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting orders from database: ${err.message}`);
    }
});

module.exports = router;
