const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class ordersService {

    async getAllOrders() {
        try {
            const orders = await prisma.orders.findMany({
                include: {
                    user: true,
                    products: { include: { product: true } }
                }
            });
            return orders;
        } 
        catch (error) {
            console.error(err);
            throw new Error(`Error fetching orders from database: ${err.message}`);
        }
    }


    async getOrder(oid) {
        try {
            const order = await prisma.orders.findUnique({
                where: { id: oid },
                include: {
                    user: true,
                    products: {include: {product: true} },
                }
            });
            return order;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching order from database: ${err.message}`);
        }
    }


    async getUserOrders(uid) {
        try {
            const orders = await prisma.orders.findMany({
                where: {uid: uid},
                include: {
                    user: true,
                    products: { include: { product: true } }
                }
            });
            return orders;    
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching order from database: ${err.message}`);
        }
    }


    async createOrder(uid, totalPrice, products) {
        try {
            const order = await prisma.orders.create({
                data: {
                    total_price: totalPrice,
                    uid: uid,
                    products: { create: products }
                }
            });
            return order;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error adding order to database: ${err.message}`);
        }
    }

    
    async deleteAllOrders() {
        try {
            const deletedOrders = await prisma.orders.deleteMany();
            return deletedOrders.count;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error deleting orders from database: ${err.message}`);
        }
    }


    async deleteOrder(oid) {
        try {
            const deletedOrder = await prisma.orders.delete({ where: { id: oid } });
            return deletedOrder;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error deleting order from database: ${err.message}`);        
        }
    }


    async deleteUserOrders(uid) {
        try {
            const deletedUserOrders = await prisma.orders.deleteMany({ where: {uid: uid} });
            return deletedUserOrders.count;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error deleting orders from database: ${err.message}`);
        }
    }

}

module.exports = { ordersService }
