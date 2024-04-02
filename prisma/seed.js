// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.users.create({
        data: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            city: 'City',
            street: 'Street',
            password: 'password',
            payment_method: 'Credit Card',
        },
    });

    const category1 = await prisma.categories.create({
        data: {
            name: 'Category 1',
        },
    });

    const product1 = await prisma.products.create({
        data: {
            name: 'Product 1',
            brand: 'Brand',
            description: 'Description',
            picture_uri: 'http://example.com/picture.jpg',
            volume: 100,
            amount: 10,
            rating: 5,
            price: 9.99,
        },
    });

    const productCategory1 = await prisma.productCategories.create({
        data: {
            pid: product1.id,
            cid: category1.id,
        },
    });

    const cart1 = await prisma.cart.create({
        data: {
            uid: user1.id,
            pid: product1.id,
            quantity: 1,
        },
    });

    const order1 = await prisma.orders.create({
        data: {
            uid: user1.id,
            total_price: product1.price,
        },
    });

    const orderItem1 = await prisma.order_items.create({
        data: {
            oid: order1.id,
            pid: product1.id,
            quantity: 1,
        },
    });
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });