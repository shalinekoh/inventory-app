const { Prisma } = require(".prisma/client");
const { Router } = require("express");
const db = require("../db/queries");

const itemRouter = Router();

// display all item
itemRouter.get("/", async (req, res) => {
  const items = await db.findAllItems();
  res.render("itemView", { items: items });
});

itemRouter.post("/:itemId/delete", async (req, res) => {
  const itemId = req.params.itemId;
  await db.deleteItem(itemId);
  res.redirect("/item");
});

itemRouter.post("/:itemId/update", async (req, res) => {
  const itemId = req.params.itemId;
  const { itemName, itemQuantity } = req.body;
  await db.updateItem(itemId, itemName, parseInt(itemQuantity));
  res.redirect("/item");
});

itemRouter.post("/category/:categoryId?/item", async (req, res) => {
  const categoryId = req.params.categoryId;
  const { itemName, itemQuantity } = req.body;
  await db.addItem(itemName, itemQuantity, categoryId);
  if (categoryId) {
    res.redirect(`/category/${categoryId}`);
  } else {
    res.redirect("/category/"); // Redirect to root or default category page if no parentId
  }
});

module.exports = itemRouter;
