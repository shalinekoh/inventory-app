const { Router } = require("express");
const db = require("../db/queries");

const itemRouter = Router();

// display all item
itemRouter.get("/", () => {});
// display specific item
itemRouter.get("/:itemId", () => {});
// get subcategories of a category
itemRouter.post("/categories/:categoryId/items", () => {});

module.exports = itemRouter;
