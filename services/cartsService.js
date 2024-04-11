const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class cartsService {

  async getAllCarts() {
    try {
      const carts = await prisma.carts.findMany();
      return carts;
    } catch (err) {
      console.error(err);
      throw new Error(`Error fetching carts from database: ${err.message}`);
    }
  }


  async deleteAllCarts() {
    try {
      await prisma.carts.deleteMany();
    } catch (err) {
      console.error(err);
      throw new Error(`Error deleting all carts: ${err.message}`);
    }
  }


  async getCart(userId) {
    try {
      const cart = await prisma.carts.findMany({
        where: {
          uid: userId,
        },
      });
      return cart;
    } catch (err) {
      console.error(err);
      throw new Error(`Error getting cart from database: ${err.message}`);
    }
  }


  async createCart(userId, productId, quantity) {
    try {
      const cart = await prisma.carts.create({
        data: {
          uid: userId,
          pid: productId,
          quantity: quantity,
        },
      });
      return cart;
    } catch (err) {
      console.error(err);
      throw new Error(`Error adding cart to database: ${err.message}`);
    }
  }


  async updateCart(userId, productId, quantity) {
    try {
      const cart = await prisma.carts.update({
        where: {
          uid_pid: {
            uid: userId,
            pid: productId,
          },
        },
        data: {
          quantity: quantity,
        },
      });
      return cart;
    } catch (err) {
      console.error(err);
      throw new Error(`Error updating cart: ${err.message}`);
    }
  }


  async deleteProductFromCart(userId, productId) {
    try {
      await prisma.carts.delete({
        where: {
          uid_pid: {
            uid: userId,
            pid: productId,
          },
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error(`Error deleting cart: ${err.message}`);
    }
  }


  async deleteCart(userId) {
    try {
      await prisma.carts.deleteMany({
        where: {
          uid: userId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error(`Error deleting cart: ${err.message}`);
    }
  }
  
}

module.exports = { cartsService };