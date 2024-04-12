const express = require('express');
const { categoriesService } = require('../services/categoriesService')

const router = express.Router();
const service = new categoriesService();


router.get("/", async (req, res) => {
    try {
        const categories = await service.getAllCategories();
        res.json(categories);    
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting categories from database: ${err.message}`);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const cid = parseInt(req.params.id);
        const categories = await service.getCategory(cid);
        res.json(categories);    
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error getting categories from database: ${err.message}`);
    }
});


router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const category = await service.createCategory(name);
        res.json(category);    
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error creating new category: ${err.message}`);
    }
});


router.put("/:id", async (req, res) => {
    try {
        const cid = parseInt(req.params.id);
        const name = req.body.name;
        const category = await service.updateCategory(cid, name);
        res.json(category);    
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating category: ${err.message}`);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const cid = parseInt(req.params.id);
        const deletedCategory = await service.deleteCategory(cid);
        res.json({ message: "Deleted category from database." });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting category: ${err.message}`);
    }
});


router.delete("/", async (req, res) => {
    try {   
        const deletedCategories = await service.deleteAllCategories();
        res.json({ message: `${deletedCategories} categories(s) deleted.` });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting categories: ${err.message}`);
    }
});

module.exports = router;