const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class categoriesService {

    async getAllCategories() {
        try {
            const categories = await prisma.categories.findMany();
            return categories;
        } 
        catch (err) {
            console.error(err);
            throw new Error(`Error fetching categories from database: ${err.message}`);
        }
    }


    async createCategory(name, description) {
        try {
            const category = await prisma.categories.create({ 
                data: { 
                    name: name,
                    description: description
                }});
            return category;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error creating new category: ${err.message}`);
        }
    }


    async getCategory(cid) {
        try {
            const category = await prisma.categories.findUnique({ where: { id: cid }});
            return category;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error creating new category: ${err.message}`);
        }
    }

    async updateCategory(cid, name) {
        try {
            const category = await prisma.categories.update({
                where: { id: cid },
                data: { name: name }
            });
            return category;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error updating category: ${err.message}`);
        }
    }


    async deleteCategory(cid) {
        try {
            const deletedCategory = await prisma.categories.delete({ where: { id: cid }});
            return deletedCategory;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error deleting category: ${err.message}`);
        }
    }


    async deleteAllCategories() {
        try {
            const deletedCategories = await prisma.categories.deleteMany();
            return deletedCategories.count;
        }
        catch (err) {
            console.error(err);
            throw new Error(`Error deleting categories: ${err.message}`);
        }
    }
}

module.exports = { categoriesService };