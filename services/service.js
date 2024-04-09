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
    async getAllProducts() {
        try {
            const products = await prisma.products.findMany()
            return products
        } catch (err) {
            console.error(err)
            throw new Error(`Error fetching products from database: ${err.message}`)
        }
    }

    async createProduct(name, brand, description, picture_uri, volume, amount, rating, price) {
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
                }
            })
            return product
        } catch (err) {
            console.error(err)
            throw new Error(`Error adding product to database: ${err.message}`)
        }
    }

    async updateAllProducts(name, brand, description, picture_uri, volume, amount, rating, price) {
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
                }
            })
            return product
        } catch (err) {
            console.error(err)
            throw new Error(`Error updating products: ${err.message}`)
        }
    }

    async deleteAllProducts() {
        try {
            await prisma.products.deleteMany()
        } catch (err) {
            console.error(err)
            throw new Error(`Error deleting all products: ${err.message}`)
        }
    }

    async getProduct(productId) {
        try {
            const product = await prisma.products.findMany({
                where: {
                    id: productId
                }
            })
            return product
        } catch (err) {
            console.error(err)
            throw new Error(`Error getting product from database: ${err.message}`)
        }
    }

    async updateProduct(productId, name, brand, description, picture_uri, volume, amount, rating, price) {
        try {
            const product = await prisma.products.update({
                where: {
                    id: productId
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
                }
            })
            return product
        } catch (err) {
            console.error(err)
            throw new Error(`Error updating product: ${err.message}`)
        }
    }

    async deleteProduct(productId) {
        try {
            await prisma.products.delete({
                where: {
                    id: productId
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error(`Error deleting product: ${err.message}`)
        }
    }
}

class usersService {

}

module.exports = cartsService, ordersService, productsService, usersService;