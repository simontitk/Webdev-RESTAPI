const express = require('express');
const router = express.Router();
const { categoriesService } = require('../services/service')

const service = new categoriesService();

router.get("/", async (req, res) => {
    // Read all categories
    try {
        res.json(await service.getAllCategories())
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error getting categories from database: ${err.message}`)
    }
});

router.post("/", async (req, res) => {
    // Create new category
    try {
        await service.createCategory(req.body.name)
        res.json({ message: 'Category added to database' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error adding category to database: ${err.message}`)
    }
});

router.put("/:id", async (req, res) => {
    // Update category
    try {
        await service.updateCategory(parseInt(req.params.id), req.body.name)
        res.json({ message: 'Category updated' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error updating category: ${err.message}`)
    }
});

router.delete("/:id", async (req, res) => {
    // Delete category
    try {
        await service.deleteCategory(parseInt(req.params.id))
        res.json({ message: 'Category deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send(`Error deleting category: ${err.message}`)
    }
});

module.exports = router;