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
    <div className="container flex p-5 mx-auto flex-row flex-wrap align-middle justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
