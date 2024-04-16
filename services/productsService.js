const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class productsService {

    async getAllProducts() {
      try {
        const products = await prisma.products.findMany({
          include: {
              categories: true
          }
        });
        return products;
      } 
      catch (err) {
        console.error(err);
        throw new Error(`Error fetching products from database: ${err.message}`);
      }
    }

    async getAllCategoryProducts(categoryIds) {
        try {
            const products = await prisma.products.findMany({
                where: {
                    categories: {
                        some: {
                            id: {
                                in: categoryIds
                            }
                        }
                    }
                },
                include: {
                    categories: true
                }
            });
        return products;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching products from database: ${err.message}`);
        }
    }

    
    async createProduct(name, brand, description, picture_uri, volume, amount, rating, price, categories) {
      try {
        const product = await prisma.products.create({
          data: {
            name: name,
            brand: brand,
            description: description,
            picture_uri: picture_uri,
            volume: volume,
            amount: amount,
            rating: rating,
            price: price,
            categories: {
              connect: categories.map(id => ({id}))
            }
          },
        });
  
        return product;
      } catch (err) {
        console.error(err);
        throw new Error(`Error adding product to database: ${err.message}`);
      }
    }

  
    async updateAllProducts(name, brand, description, picture_uri, volume, amount, rating, price, categories) {
      try {
        const product = await prisma.products.update({
          data: {
            name: name,
            brand: brand,
            description: description,
            picture_uri: picture_uri,
            volume: volume,
            amount: amount,
            rating: rating,
            price: price,
            categories: {
              connect: categories.map(id => ({id}))
            }
          },
        });
        return product;
      } catch (err) {
        console.error(err);
        throw new Error(`Error updating products: ${err.message}`);
      }
    }
  

    async deleteAllProducts() {
      try {
        await prisma.products.updateMany({
            data: {
                discontinued: true
            }
        });
      } catch (err) {
        console.error(err);
        throw new Error(`Error deleting all products: ${err.message}`);
      }
    }
  

    async getProduct(productId) {
      try {
        const product = await prisma.products.findUniqueOrThrow({
          where: {
            id: productId,
          },
          include: {
              categories: true
          }
        });
        return product;
      } catch (err) {
        console.error(err);
        throw new Error(`Error getting product from database: ${err.message}`);
      }
    }

  
    async updateProduct(productId, name, brand, description, picture_uri, volume, amount, rating, price, categories) {
      try {
        const product = await prisma.products.update({
          where: {
            id: productId,
          },
          data: {
            name: name,
            brand: brand,
            description: description,
            picture_uri: picture_uri,
            volume: volume,
            amount: amount,
            rating: rating,
            price: price,
            categories: {
              connect: categories.map(id => ({id}))
            }
          },
        });
        return product;
      } catch (err) {
        console.error(err);
        throw new Error(`Error updating product: ${err.message}`);
      }
    }
  

    async deleteProduct(productId) {
      try {
        const deletedProduct = await prisma.products.update({
          where: {
            id: productId,
          },
          data: {
            discontinued: true
          }
        });
        return deletedProduct;
      } catch (err) {
        console.error(err);
        throw new Error(`Error deleting product: ${err.message}`);
      }
    }

  }

  module.exports = { productsService };