// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    const category1 = await prisma.categories.create({
        data: {
            name: 'Category 1',
        },
    });

    const category2 = await prisma.categories.create({
        data: {
            name: 'Category 2',
        },
    });

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

    const user2 = await prisma.users.create({
        data: {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane.doe@example.com',
            phone: '0987654321',
            city: 'City',
            street: 'Street',
            password: 'password',
            payment_method: 'Credit Card',
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
            categories: {
                connect: [{id: 1}]
              }
        },
    });

    const product2 = await prisma.products.create({
        data: {
            name: 'Product 2',
            brand: 'Brand',
            description: 'Description',
            picture_uri: 'http://example.com/picture.jpg',
            volume: 50,
            amount: 5,
            rating: 2,
            price: 1.99,
            categories: {
                connect: [{id: 2}]
              }
        },
    });

    const cart1 = await prisma.carts.create({
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
            products: {
                create: [{quantity: 2, pid: product1.id}]
            }
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