const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create root categories
  const electronics = await prisma.category.create({
    data: { name: "Electronics" },
  });

  const furniture = await prisma.category.create({
    data: { name: "Furniture" },
  });

  // Create subcategories for Electronics
  const mobilePhones = await prisma.category.create({
    data: {
      name: "Mobile Phones",
      parentId: electronics.id, // Link to Electronics category
    },
  });

  const laptops = await prisma.category.create({
    data: {
      name: "Laptops",
      parentId: electronics.id, // Link to Electronics category
    },
  });

  // Create subcategories for Furniture
  const chairs = await prisma.category.create({
    data: {
      name: "Chairs",
      parentId: furniture.id, // Link to Furniture category
    },
  });

  const tables = await prisma.category.create({
    data: {
      name: "Tables",
      parentId: furniture.id, // Link to Furniture category
    },
  });

  // Create items for Mobile Phones category
  await prisma.item.createMany({
    data: [
      { name: "iPhone 12", quantity: 10, categoryId: mobilePhones.id },
      { name: "Samsung Galaxy S21", quantity: 5, categoryId: mobilePhones.id },
    ],
  });

  // Create items for Laptops category
  await prisma.item.createMany({
    data: [
      { name: "MacBook Pro", quantity: 3, categoryId: laptops.id },
      { name: "Dell XPS 13", quantity: 4, categoryId: laptops.id },
    ],
  });

  // Create items for Chairs category
  await prisma.item.createMany({
    data: [
      { name: "Wooden Chair", quantity: 15, categoryId: chairs.id },
      { name: "Office Chair", quantity: 8, categoryId: chairs.id },
    ],
  });

  // Create items for Tables category
  await prisma.item.createMany({
    data: [
      { name: "Dining Table", quantity: 2, categoryId: tables.id },
      { name: "Coffee Table", quantity: 7, categoryId: tables.id },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
