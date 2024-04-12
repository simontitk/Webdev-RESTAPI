const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class usersService {
<<<<<<< HEAD

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
=======
    
}

module.exports = { usersService };

>>>>>>> main
