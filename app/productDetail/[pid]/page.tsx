import { PrismaClient } from "@prisma/client"
import Image from "next/image"

async function getData(id: number) {
  const prisma = new PrismaClient()
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      pictures: true,
    },
  })
  prisma.$disconnect()
  return product!
}

export default async function Page({ params }: { params: { pid: string } }) {
  const product = await getData(parseInt(params.pid))
  return (
    <div className="container m-5 p-5 full-w mx-auto shadow flex flex-row">
      {/* left */}
      <div className="flex flex-col">
        <div className="max-w-lg">
          <Image
            src={product.pictures[0].url}
            alt="pic"
            width={800}
            height={600}
          />
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col p-5">
        {/* product info */}
        <div className="text-3xl">{product.name}</div>
        <div>{product.type}</div>
        <div
          className="text-base mt-10"
          dangerouslySetInnerHTML={{ __html: product.description.toString() }}
        />
        <div>£ {product.price}</div>
        {/* buy */}
      </div>
    </div>
  )
}
