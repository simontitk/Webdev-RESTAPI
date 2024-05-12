const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class cartItemsService {

  async getAllCartItems() {
    try {
      const carts = await prisma.cartItems.findMany({
        include: {
          product: true
        }
      });
      return carts;
    } catch (err) {
      console.error(err);
      throw new Error(`Error fetching cart items from database: ${err.message}`);
    }
  }


  async deleteAllCartItems() {
    try {
      await prisma.cartItems.deleteMany();
    } catch (err) {
      console.error(err);
      throw new Error(`Error removing all items from all carts: ${err.message}`);
    }
  }


  async getCartItems(userId) {
    try {
      const cart = await prisma.cartItems.findMany({
        where: {
          uid: userId,
        },
        include: {
          product: true
        }
      });
      return cart;
    } catch (err) {
      console.error(err);
      throw new Error(`Error getting cart items from database: ${err.message}`);
    }
  }


  async addCartItem(userId, productId, quantity) {
    try {
      let cartItem = await prisma.cartItems.findFirst({
        where: {
          uid: userId,
          pid: productId,
        },
      });
      if (cartItem) {
        cartItem = await prisma.cartItems.update({
          where: {
            uid_pid: {
              uid: userId,
              pid: productId,
            },
          },
          data: {
            quantity: {
              increment: quantity,
            },
          },
          include: {
            product: true
          }
        });
        return cartItem;
      }
      else {
        cartItem = await prisma.cartItems.create({
          data: {
            uid: userId,
            pid: productId,
            quantity: quantity,
          },
          include: {
            product: true
          }
        });
      }
      return cartItem;
    } catch (err) {
      console.error(err);
      throw new Error(`Error adding item to cart: ${err.message}`);
    }
  }


  async updateCartItem(userId, productId, quantity) {
    try {
      const cart = await prisma.cartItems.update({
        where: {
          uid_pid: {
            uid: userId,
            pid: productId,
          },
        },
        data: {
          quantity: quantity,
        },
        include: {
          product: true
        }
      });
      console.log(cart);
      return cart;
    } catch (err) {
      console.error(err);
      throw new Error(`Error updating cart: ${err.message}`);
    }
  }


  async deleteCartItem(userId, productId) {
    try {
      await prisma.cartItems.delete({
        where: {
          uid_pid: {
            uid: userId,
            pid: productId,
          },
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error(`Error removing item from cart: ${err.message}`);
    }
  }

}

module.exports = { cartItemsService };