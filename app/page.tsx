import Image from "next/image"
import Link from 'next/link'

export default function Index() {
  return (
    <main className="container flex flex-col w-full justify-center align-middle">
      <h4 className="text-center py-4 text-teal-400 text-3xl font-semibold">
        Under Construction
      </h4>

      <Link href="/products" className="text-center p-2 text-teal-800"> Products Page </Link>
      <Link href="/admin/addProduct" className="text-center p-2 text-teal-800"> Add Product</Link>

      <Image
        className="mx-auto mt-40"
        src="/undraw_work_in_progress_re_byic.svg"
        height={400}
        width={300}
        alt="work in progress"
      />
    </main>
  )
}
