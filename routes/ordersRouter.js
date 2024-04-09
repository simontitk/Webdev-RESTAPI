const express = require('express');
const router = express.Router();

const { ordersService } = require('../services/service');
const service = new ordersService();

router.get("/", async (req, res) => {
    try {
        res.json(await service.getAllOrders());
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting orders from database: ${err.message}`);
    }
});

router.post("/", (req, res) => {

});

router.put("/", (req, res) => {

});

router.delete("/", (req, res) => {

});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        res.json(await service.getOrder(id));
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting orders from database: ${err.message}`);
    }

});

router.post("/:id", (req, res) => {

});

router.put("/:id", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

module.exports = router;
