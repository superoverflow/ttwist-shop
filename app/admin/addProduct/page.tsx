"use client";

import { Form, FormRenderProps, useField } from "react-final-form";
import React from "react";
import { cva } from "class-variance-authority";

const inputVariant = cva(["border", "shadow", "rounded"], {
  variants: {
    intent: {
      primary: [" border-stone-400"],
      secondary: [" border-stone-900"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const buttonVariant = cva(["border", "shadow"], {
  variants: {
    intent: {
      primary: ["border-stone-400 rounded hover:bg-slate-400"],
      secondary: ["border-stone-900 rounded hover:bg-slate-900"],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const ProductForm = () => {
  type Props = {
    productName: string;
    productType: string;
    description: string;
    price: number;
    stock: number;
  };

  const FormContent = (props: FormRenderProps<Props>) => {
    const productName = useField("name");
    const productType = useField("type");
    const description = useField("description");
    const price = useField("price", { type: "number" });
    const stock = useField("stock", { type: "number" });

    return (
      <div className="container mx-auto py-5">
        <h1 className="text-3xl font-bold">Hello world!</h1>
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
            <input
              className={inputVariant()}
              {...price.input}
              placeholder="price"
            />
            <input
              className={inputVariant()}
              {...stock.input}
              type="number"
              placeholder="stock"
            />
            <button className={buttonVariant()} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Form
      onSubmit={(payload) => {
        console.log({ payload });
      }}
      component={FormContent}
    />
  );
};

export default function Page() {
  return (
    <div>
      <ProductForm />
    </div>
  );
}
