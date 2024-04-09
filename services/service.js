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

}

class productsService {

}

class usersService {

    async getUser(userId) {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            })
            return user;
        } catch (err) {
            console.error(err)
            throw new Error(`Error getting User from database: ${err.message}`)
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.users.findMany()
            return users
        } catch (err) {
            console.error(err)
            throw new Error(`Error getting users from database: ${err.message}`)
        }
    }

    async createUser( 
        first_name, 
        last_name, 
        email, 
        phone, 
        city, 
        street, 
        password, 
        payment_method
    ) {
        try {
            const user = await prisma.users.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    city: city,
                    street: street,
                    password: password,
                    payment_method: payment_method
                }
            })
            return user
        } catch (err) {
            console.error(err)
            throw new Error(`Error adding user to database: ${err.message}`)
        }
    }

}

module.exports = {usersService, cartsService, ordersService, productsService}