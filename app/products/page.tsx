import { PrismaClient } from "@prisma/client"
import type { Product } from "@prisma/client"

const prisma = new PrismaClient()

async function getData() {
  const products = await prisma.product.findMany()
  return products
}

const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex flex-col">
    <div>name: {product.name}</div>
    <div>type: {product.type}</div>
    <div
      className="ProseMirror [&>*]:list-disc [&>*]:list-inside"
      dangerouslySetInnerHTML={{ __html: product.description.toString() }}
    />
    <div>price: {product.price}</div>
    <div>stock: {product.stock}</div>
  </div>
)

export default async function Page() {
  const products = await getData()
  console.log({ products })
  return (
    <div>
      {products.map((product, index) => (
        <div key={index} className="border border-stone-600">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
