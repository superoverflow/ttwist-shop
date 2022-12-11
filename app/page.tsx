import Image from "next/image";

export default function Index() {
  return (
    <main className="flex flex-col w-full justify-center align-middle">
      <h4 className="text-center py-4 mb-10 text-teal-400 text-3xl font-semibold">
        Under Construction
      </h4>
      <Image
        className="mx-auto"
        src="/undraw_work_in_progress_re_byic.svg"
        height={800}
        width={600}
        alt="work in progress"
      />
    </main>
  );
}
