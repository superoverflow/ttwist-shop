import { PrismaClient } from "@prisma/client"
import type { Product, Pictures } from "@prisma/client"

const prisma = new PrismaClient()

async function getData() {
  const products = await prisma.product.findMany({
    include: {
      pictures: true,
    },
  })
  return products
}

const ProductCard = ({
  product,
}: {
  product: Product & { pictures: Pictures[] }
}) => (
  <div className="flex flex-col">
    <div>name: {product.name}</div>
    <div>type: {product.type}</div>
    <div
      className="ProseMirror [&>*]:list-disc [&>*]:list-inside"
      dangerouslySetInnerHTML={{ __html: product.description.toString() }}
    />
    <div>price: {product.price}</div>
    <div>stock: {product.stock}</div>
    {product.pictures.map((picture) => (
      <img key={picture.id} src={picture.url} alt={picture.id} />
    ))}
  </div>
)

export default async function Page() {
  const products = await getData()

  return (
    <div className="container p-2">
      {products.map((product, index) => (
        <div key={index} className="border border-stone-600 p-2">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
