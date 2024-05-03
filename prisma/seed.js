// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { getCategories, getProducts } = require('./products.js');

async function main() {

    const products = getProducts();
    const categoriesData = getCategories();
    const categoryMap = new Map();
    for (const categoryData of categoriesData) {
        const category = await prisma.categories.create({
            data: {
                name: categoryData.category,
                description: categoryData.description,
            },
        });
        categoryMap.set(categoryData.category, category.id);
    }

    for (const product of products) {
        await prisma.products.create({
            data: {
                picture_uri: product.picture,
                name: product.name,
                brand: product.brand,
                description: product.description,
                volume: product.size,
                amount: product.quantity,
                rating: product.rating,
                price: product.price,
                categories: {
                    connect: product.categories.map(categoryName => ({
                        id: categoryMap.get(categoryName),
                    })),
                },
            },
        });
    }

    const user1 = await prisma.users.create({
        data: {
            first_name: 'Belle',
            last_name: 'Delphine',
            email: 'belle@example.com',
            phone: '1234567890',
            city: 'Copenhagen',
            street: 'Hydrovej 420',
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



    const cart1 = await prisma.cartItems.create({
        data: {
            uid: user1.id,
            pid: 1,
            quantity: 1,
        },
    });

    const order1 = await prisma.orders.create({
        data: {
            uid: user1.id,
            total_price: 9.95,
            products: {
                create: [{ quantity: 2, pid: 1 }]
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