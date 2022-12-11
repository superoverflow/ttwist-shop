"use client"
import React from "react"
import { Form, FormRenderProps, useField } from "react-final-form"
import RichTextEditor from "components/RichTextEditor"
import { cva } from "class-variance-authority"
import axios from "axios"
import type { Prisma } from "@prisma/client"

type Props = Prisma.ProductCreateInput

async function addProduct(product: Prisma.ProductCreateInput) {
  axios.post("/api/add", product).then(() => console.log("okay!"))
}

const inputVariant = cva(["border", "shadow", "rounded", "px-2", "mx-4"], {
  variants: {
    intent: {
      primary: ["border-stone-400"],
      secondary: ["border-stone-900"],
    },
    size: {
      small: ["w-1/4"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
})

const buttonVariant = cva(
  ["border", "shadow", "rounded", "px-2", "py-1", "ml-auto", "mr-4"],
  {
    variants: {
      intent: {
        primary: ["border-stone-400", "hover:bg-slate-400"],
        secondary: ["border-stone-900", "hover:bg-slate-900"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
)

const ProductForm = () => {
  const FormContent = (props: FormRenderProps<Props>) => {
    const productName = useField("name")
    const productType = useField("type")
    const description = useField("description")
    const price = useField("price", { type: "number" })
    const stock = useField("stock", { type: "number" })

    return (
      <div className="container mx-auto py-2">
        <h1 className="text-3xl font-bold text-center mb-5">Add new product</h1>
        <form onSubmit={props.handleSubmit}>
          <div className="flex flex-col space-y-2 mt-2">
            <input
              className={inputVariant()}
              {...productName.input}
              placeholder="product name"
            />
            <input
              className={inputVariant()}
              {...productType.input}
              type="text"
              placeholder="type"
            />
            <textarea
              className={inputVariant()}
              {...description.input}
              placeholder="description"
              rows={3}
            />
            <RichTextEditor />
            <div className="flex flex-auto flex-row">
              <input
                className={inputVariant({ size: "small" })}
                {...price.input}
                placeholder="price"
              />
              <input
                className={inputVariant({ size: "small" })}
                {...stock.input}
                placeholder="stock"
              />
              <button className={buttonVariant()} type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <Form
      onSubmit={async (payload) => {
        console.log(payload)
        const product = await addProduct(payload)
      }}
      component={FormContent}
    />
  )
}

export default function Page() {
  return (
    <div>
      <ProductForm />
    </div>
  )
}
