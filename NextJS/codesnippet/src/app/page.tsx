import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <div className="">
          <p className="text-4xl font-bold  text-white px-8 py-5 border-b border-slate-500">CODE-Snippets-App</p>
        </div>

        <div className="flex items-center justify-between px-15 mt-10">
          <div className="text-white font-semibold text-2xl">
            <h1 className="border border-slate-500 rounded-xl px-8 py-2">Snippets</h1>
          </div>
          <div className="pr-50">
            <Link href="/snippet/new">
              <button className="text-white bg-slate-900 px-8 py-2 cursor-pointer text-xl rounded-xl font-semibold shadow-2xl">New</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
