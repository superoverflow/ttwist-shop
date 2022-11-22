import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from "mysql2"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connection = mysql.createConnection(process.env.DATABASE_URL || "")
  console.log('Connected to PlanetScale!')

  res.status(200).json({ name: 'John Doe' })
}
