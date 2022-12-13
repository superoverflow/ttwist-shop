import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import type { Prisma } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).json({ message: "Not supported!" })
    return
  }
  if (req.method === "POST") {
    console.log(req.body)
    const prisma = new PrismaClient()
    const product = req.body as Prisma.ProductCreateInput
    const result = await prisma.product.create({
      data: {
        name: product.name,
        type: product.type,
        price: Number(product.price),
        stock: Number(product.stock),
        description: Buffer.from(product.description),
        pictures: {
          create: product.pictures //FIXME: type error
        },
      },
    })

    console.log(result)
    res.status(200).json({ message: "Succeed!" })
    prisma.$disconnect()
    return
  }
}
