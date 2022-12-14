import type { Product, Picture } from "@prisma/client"
import Image from "next/image"
import React from "react"

export const ProductCard = ({
  product
}: {
  product: Product & { pictures: Picture[] }
}) => {
  const coverPhotoUrl = product.pictures[0].url
  const productName = product.name
  const price = product.price

  return (
    <div className="max-w-xs overflow-hidden rounded-xl bg-teal-50 shadow-md duration-200 hover:scale-105 hover:shadow-xl m-5">
      <Image
        src={coverPhotoUrl}
        alt={productName}
        width={800}
        height={600}
        className="w-full"
      />
      <div className="flex flex-col p-5">
        <div className="flex flex-row">
          <span className="flex-grow text-base font-semibold mb-1 text-teal-800 ">
            {productName.toUpperCase()}
          </span>
          <span className="text-sm text-right mb-5 text-teal-600">
            £ {price}
          </span>
        </div>
        <button className="w-full rounded-md bg-teal-600  py-2 text-teal-100 hover:bg-teal-500 hover:shadow-md duration-75">
          Buy
        </button>
      </div>
    </div>
  )
}
