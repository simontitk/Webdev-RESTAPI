const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {usersService, cartsService, ordersService, productsService}