import { PrismaClient } from "@prisma/client"
import { ProductCard } from "components/ProductCard"
import type { Product, Picture } from "@prisma/client"

const prisma = new PrismaClient()

async function getData() {
  const products = await prisma.product.findMany({
    include: {
      pictures: true,
    },
  })
  return products
}

export default async function Page() {
  const products = await getData()

  return (
    <div className="container flex p-2 space-x-5">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  )
}
