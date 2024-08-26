import RegisterComp from "@/components/RegisterComp";
import HrefBtnComp from "@/components/HrefBtnComp";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Twitter Clone | Register",
};

export default function Home() {
  return (
    <main className='h-screen flex flex-col items-center justify-center'>
      <div className='mb-3 text-secondary text-center after:mb-4 hover:-rotate-12 hover:bg-primary transition border rounded-xl hover:border-dashed px-2 py-2'>
        <h1 className="text-4xl mb-1">Welcome to Next.js!</h1>
        <p className='text-text text-opacity-60'>(a twitter clone)</p>
      </div>
      <RegisterComp />
      <HrefBtnComp route="./login" text="Go to /Login" />
    </main>
  );
}