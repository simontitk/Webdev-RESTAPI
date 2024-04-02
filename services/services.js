const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class Service {
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
}

