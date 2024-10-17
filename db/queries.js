const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async (id = null) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: id },
    });
    return categories;
  } catch (error) {
    console.log("Error fetching categories");
    throw error;
  }
};

const getItems = async (categoryId) => {
  try {
    return await prisma.item.findMany({
      where: { categoryId: categoryId }, // Fetch items for the current category
    });
  } catch (error) {
    throw error;
  }
};

const getCategorybyID = async (id) => {
  try {
    const catName = await prisma.category.findFirst({
      where: { id: id },
      select: {
        name: true,
      },
    });
    return catName;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategories,
  getItems,
  getCategorybyID,
};
