import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Record = {
  name: string;
  stock: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record[]>
) {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany();
  const result = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));
  res.status(200).json(result);
}
