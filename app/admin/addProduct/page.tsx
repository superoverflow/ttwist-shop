"use client"
import axios from "axios"
import { Form, FormRenderProps, useField } from "react-final-form"
import { RichTextEditor } from "components/RichTextEditor"
import { UploadFilesPanel } from "components/UploadFilesPanel"
import { cva } from "class-variance-authority"
import Image from "next/image"
import type { Prisma } from "@prisma/client"

type Props = Prisma.ProductCreateInput

async function addProduct(product: Prisma.ProductCreateInput) {
  axios.post("/api/add", product).then(() => console.log("okay!"))
}

async function uploadToS3(file: File | undefined) {
  if (!file) {
    return
  }

  const { data } = await axios.post("/api/presignedUrl", {
    name: file.name,
    type: file.type,
  })

  const url = data.url
  const { data: newData } = await axios.put(url, file, {
    headers: {
      "Content-type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  })

  console.log({ newData })
}

const inputVariant = cva(["border", "shadow", "rounded"], {
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
  ["border", "shadow", "rounded", "px-2", "py-1", "ml-auto"],
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
    const description = useField("description", {
      initialValue: `<p>Any <b>description</b> can be <u>put</u> <i>below</i>:</p>
       <ul>
        <li>feature 1</li>
        <li>feature 2</li>
      </ul>
      `,
    })
    const price = useField("price", { type: "number" })
    const stock = useField("stock", { type: "number" })

    return (
      <form onSubmit={props.handleSubmit}>
        <div className="flex flex-col space-y-2 mt-2">
          <input
            className={inputVariant()}
            {...productName.input}
            type="text"
            placeholder="product name"
          />
          <input
            className={inputVariant()}
            {...productType.input}
            type="text"
            placeholder="type"
          />
          <RichTextEditor
            editable
            content={description.input.value}
            onChange={description.input.onChange}
          />

          <UploadFilesPanel />

          <div className="flex flex-auto flex-row">
            <input
              className={inputVariant({
                size: "small",
                className: "text-right",
              })}
              {...price.input}
              placeholder="price"
            />
            <input
              className={inputVariant({
                size: "small",
                className: "text-right ml-2",
              })}
              {...stock.input}
              placeholder="stock"
            />
            <button className={buttonVariant()} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-5 text-teal-600">
        Create new product
      </h1>
      <ProductForm />
      <Image
        className="mx-auto mt-20 w-auto"
        src="/undraw_create_re_57a3.svg"
        alt="create new product"
        width={500}
        height={500}
        priority
      />
    </div>
  )
}
