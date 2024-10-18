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

categoryRouter.post("/", (req, res) => {
  res.redirect(`/category`);
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
categoryRouter.post("/:categoryId", async (req, res) => {
  const parentId = req.params.categoryId;
  const categoryName = req.body.categoryName;
  await db.addCategory(categoryName, parentId);
  res.redirect(`/category/${parentId}`);
});

// display the form to add new category
categoryRouter.get("/:categoryId/subcategories", () => {});

module.exports = categoryRouter;
