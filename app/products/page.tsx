import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getData() {
  const products = await prisma.product.findMany();
  return products;
}

export default async function Page() {
  const products = await getData();
  return (
    <>
      {products.map((product) => (
        <h1 key={product.id}>Hello, {product.name_gb} </h1>
      ))}
    </>
  );
}
