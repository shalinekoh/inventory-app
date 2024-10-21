const { Router } = require("express");
const db = require("../db/queries");

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await db.getCategories();
  res.render("categoryView", {
    categories: categories,
    title: "Categories",
    items: [],
    parentId: null,
  });
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const parentId = req.params.categoryId;
  const categories = await db.getCategories(parentId);
  const items = await db.getItems(parentId);
  const categoryName = await db.getCategorybyID(parentId);
  res.render("categoryView", {
    categories: categories,
    title: categoryName.name,
    items: items,
    parentId: parentId,
  });
});

// add new category
categoryRouter.post("/:categoryId?", async (req, res) => {
  const parentId = req.params.categoryId;
  const categoryName = req.body.categoryName;
  await db.addCategory(categoryName, parentId);
  if (parentId) {
    res.redirect(`/category/${parentId}`);
  } else {
    res.redirect("/category/"); // Redirect to root or default category page if no parentId
  }
});

categoryRouter.post("/:categoryId?/delete", async (req, res) => {
  const id = req.params.categoryId;
  const parentId = await db.deleteCategory(id);
  // Check if parentId exists and redirect accordingly
  if (parentId) {
    res.redirect(`/category/${parentId}`);
  } else {
    res.redirect("/category/"); // Redirect to root or default category page if no parentId
  }
});
// display the form to edit category
categoryRouter.post("/:categoryId/update", async (req, res) => {
  const newName = req.body.categoryName;
  const id = req.params.categoryId;
  const parentId = await db.updateCategory(id, newName);
  if (parentId) {
    res.redirect(`/category/${parentId}`);
  } else {
    res.redirect("/category/"); // Redirect to root or default category page if no parentId
  }
});

categoryRouter.post("/:categoryId/item", async (req, res) => {
  const categoryId = req.params.categoryId;
  const { itemName, itemQuantity } = req.body;
  await db.addItem(itemName, parseInt(itemQuantity), categoryId);

  res.redirect(`/category/${categoryId}`);
});

module.exports = categoryRouter;
