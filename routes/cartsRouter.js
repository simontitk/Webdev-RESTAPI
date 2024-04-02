const express = require('express');
const router = express.Router();

const cartsService = require('../services/service')
const service = new cartsService();


// router.get("/", (req, res) => {

// });

// router.post("/", (req, res) => {

// });

// c artsRouter.put("/", (req, res) => {

// });

// router.delete("/", (req, res) => {

// });

// router.get("/:id", (req, res) => {

// });

router.post("/:id", (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        service.createCart(uid, req.body.pid, req.body.quantity)
        res.json({ message: 'Cart added to database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error adding cart to database: ${err.message}`)
    }
});

// router.put("/:id", (req, res) => {

// });

// router.delete("/:id", (req, res) => {

// });


module.exports = router;

