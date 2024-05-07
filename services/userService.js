const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

class userService {

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

    async getUserByEmail(email) {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    email: email
                }
            })
            return user
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
        firstName,
        lastName,
        email,
        phone,
        city,
        street,
        password,
    ) {
        try {
            const user = await prisma.users.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    city: city,
                    street: street,
                    password: password,
                }
            })
            return user
        } catch (err) {
            console.error(err)
            throw new Error(`Error adding user to database: ${err.message}`)
        }
    }

    async updateUser(
        userId,
        firstName,
        lastName,
        email,
        phone,
        city,
        street,
        password,
        paymentMethod
    ) {
        try {
            const user = await prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    first_name: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    city: city,
                    street: street,
                    password: password,
                    payment_method: paymentMethod
                }
            })
            return user
        } catch (err) {
            console.error(err)
            throw new Error(`Error updating user information: ${err.message}`)
        }
    }

    async deleteUser(userId) {
        try {
            await prisma.users.delete({
                where: {
                    id: userId,
                },
            });
        } catch (err) {
            console.error(err);
            throw new Error(`Error deleting user: ${err.message}`);
        }
    }

    async deleteAllUsers() {
        try {
            await prisma.users.deleteMany();
        } catch (err) {
            console.error(err);
            throw new Error(`Error deleting all users: ${err.message}`);
        }
    }

}

module.exports = { userService };