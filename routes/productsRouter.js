const express = require("express");
const router = express.Router();
const { productsService } = require('../services/productsService');

const service = new productsService();

router.get("/", async (req, res) => {
  try {
    let cid = req.query.category;
    if (!cid) {
      res.json(await service.getAllProducts());
    }
    else {
      cid = (Array.isArray(cid)) ? cid.map(c => parseInt(c)) : [parseInt(cid),];
      res.json(await service.getAllCategoryProducts(cid));
    }

  } catch (err) {
    console.error(err);
    res.status(500).send(`Error getting products from database: ${err.message}`);
  }
});

router.post("/", async (req, res) => {
  // Create new product
  try {
    const { name, brand, description, picture_uri, volume, amount, rating, price, categories } = req.body;
    const product = await service.createProduct(name, brand, description, picture_uri, volume, amount, rating, price, categories);
    res.json({
      message: "Product added to database",
      product: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error adding product to database: ${err.message}`);
  }
});

router.put("/", async (req, res) => {
  // Update all products
  const { name, brand, description, picture_uri, volume, amount, rating, price, categories } = req.body;
  try {
    await service.updateAllProducts(name, brand, description, picture_uri, volume, amount, rating, price, categories);
    res.json({ message: "All products updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating products: ${err.message}`);
  }
});

router.delete("/", async (req, res) => {
  // Delete all products
  try {
    await service.deleteAllProducts();
    res.json({ message: "All products discontinued" });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error deleting all products: ${err.message}`);
  }
});

router.get("/:id", async (req, res) => {
  // Get product @ pid
  try {
    const pid = parseInt(req.params.id);
    res.json(await service.getProduct(pid));
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error getting product from database: ${err.message}`);
  }
});

router.put("/:id", async (req, res) => {
  // Update product @ pid
  try {
    const pid = parseInt(req.params.id);
    const { name, brand, description, picture_uri, volume, amount, rating, price, categories } = req.body;
    await service.updateProduct(pid, name, brand, description, picture_uri, volume, amount, rating, price, categories);
    res.json({ message: "Product updated" });
  }
  catch (err) {
    console.error(err);
    res.status(500).send(`Error updating product: ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  // Delete product @ pid
  try {
    const pid = parseInt(req.params.id);
    const deletedProduct = await service.deleteProduct(pid);
    res.json({ message: `${deletedProduct.name} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error discontining product from database: ${err.message}`);
  }
});

module.exports = router;
