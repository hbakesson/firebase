import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const products = [
    {
      name: "Wireless Mouse",
      sku: "W-MOUSE-001",
      quantity: 15,
    },
    {
      name: "Mechanical Keyboard",
      sku: "M-KEY-002",
      quantity: 8,
    },
    {
      name: "27-inch Monitor",
      sku: "MON-27-003",
      quantity: 5,
    },
    {
      name: "USB-C Cable",
      sku: "USB-C-004",
      quantity: 50,
    },
    {
      name: "Laptop Stand",
      sku: "LS-005",
      quantity: 12,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: "" }, // This is dummy because we use SKU or just create
      // Actually, let's use name as a simple unique key for seeding or just create
      update: {},
      create: product,
    });
    // Simpler: just create if not exists or just create
    // we use id: uuid() anyway
  }

  // Better approach:
  await prisma.product.deleteMany({}); // Clear existing data for a clean seed
  
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
