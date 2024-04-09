const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class cartsService {
    async getAllCarts() {
        try {
            const carts = await prisma.cart.findMany()
            return carts
        } catch (err) {
            console.error(err)
            throw new Error(`Error fetching carts from database: ${err.message}`)
        }
    }

    async deleteAllCarts() {
        try {
            await prisma.cart.deleteMany()
        } catch (err) {
            console.error(err)
            throw new Error(`Error deleting all carts: ${err.message}`)
        }
    }

    async getCart(userId) {
        try {
            const cart = await prisma.cart.findMany({
                where: {
                    uid: userId
                }
            })
            return cart
        } catch (err) {
            console.error(err)
            throw new Error(`Error getting cart from database: ${err.message}`)
        }
    }

    async createCart(userId, productId, quantity) {
        try {
            const cart = await prisma.cart.create({
                data: {
                    uid: userId,
                    pid: productId,
                    quantity: quantity
                }
            })
            return cart
        } catch (err) {
            console.error(err)
            throw new Error(`Error adding cart to database: ${err.message}`)
        }
    }

    async updateCart(userId, productId, quantity) {
        try {
            const cart = await prisma.cart.update({
                where: {
                    uid_pid: {
                        uid: userId,
                        pid: productId
                    }
                },
                data: {
                    quantity: quantity
                }
            })
            return cart
        } catch (err) {
            console.error(err)
            throw new Error(`Error updating cart: ${err.message}`)
        }
    }

    async deleteProductFromCart(userId, productId) {
        try {
            await prisma.cart.delete({
                where: {
                    uid_pid: {
                        uid: userId,
                        pid: productId
                    }
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error(`Error deleting cart: ${err.message}`)
        }
    }

    async deleteCart(userId) {
        try {
            await prisma.cart.deleteMany({
                where: {
                    uid: userId,
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error(`Error deleting cart: ${err.message}`)
        }
    }
}

class ordersService {
    async getAllOrders() {
        try {
            const orders = await prisma.orders.findMany({
                include: {
                    Order_items: {include: {product: true}},
                    user: true
                }
            });
            return orders;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching orders from database: ${err.message}`)

        }
    }

    async getOrder(orderId) {
        try {
            const order = await prisma.orders.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    Order_items: {include: {product: true}},
                    user: true
                }
            });
            return order;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching order from database: ${err.message}`)
        }
    }
}

class productsService {

}

class usersService {

}

module.exports = { cartsService, ordersService, productsService, usersService };