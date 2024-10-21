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

const addCategory = async (name, parentId) => {
  try {
    await prisma.category.create({
      data: {
        name: name,
        parentId: parentId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  const parentId = getCategorybyID(categoryId).parentId;
  // First, delete all items associated with the current category
  await prisma.item.deleteMany({
    where: {
      categoryId: categoryId,
    },
  });

  // Fetch all subcategories of the current category
  const subcategories = await prisma.category.findMany({
    where: {
      parentId: categoryId,
    },
  });

  // Recursively delete all subcategories
  for (const subcategory of subcategories) {
    await deleteCategory(subcategory.id); // Recursive call
  }

  // Finally, delete the category itself
  const deletedCat = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedCat.parentId;
};

const updateCategory = async (id, newName) => {
  const updateName = await prisma.category.update({
    where: { id: id },
    data: {
      name: newName,
    },
  });
  return updateName.parentId;
};

const findAllItems = async () => {
  return await prisma.item.findMany({});
};

const deleteItem = async (id) => {
  return await prisma.item.delete({
    where: { id: id },
  });
};

const updateItem = async (id, name, quantity) => {
  return await prisma.item.update({
    where: { id: id },
    data: {
      name: name,
      quantity: quantity,
    },
  });
};

const addItem = async (name, quantity, categoryId) => {
  return await prisma.item.create({
    data: {
      name: name,
      quantity: quantity,
      categoryId: categoryId,
    },
  });
};

module.exports = {
  getCategories,
  getItems,
  getCategorybyID,
  addCategory,
  deleteCategory,
  updateCategory,
  findAllItems,
  deleteItem,
  updateItem,
  addItem,
};
