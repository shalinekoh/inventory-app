const { Router } = require("express");
const db = require("../db/queries");

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await db.getCategories();
  res.render("categoryView", {
    categories: categories,
    title: "Categories",
    items: [],
  });
});
categoryRouter.get("/:categoryId", async (req, res) => {
  const categories = await db.getCategories(req.params.categoryId);
  const items = await db.getItems(req.params.categoryId);
  const categoryName = await db.getCategorybyID(req.params.categoryId);
  res.render("categoryView", {
    categories: categories,
    title: categoryName.name,
    items: items,
  });
});

// add new category
categoryRouter.post("/:categoryId", () => {});

// display the form to add new category
categoryRouter.get("/:categoryId/subcategories", () => {});

module.exports = categoryRouter;
