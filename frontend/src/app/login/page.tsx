import LoginComp from "@/components/LoginComp";
import HrefBtnComp from "@/components/HrefBtnComp";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Twitter Clone | Login",
};

export default function LoginPage() {
  return (
    <main className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-primary mb-4 text-4xl hover:scale-105 transition border border-secondary bg-secondary rounded-xl hover:border-dashed px-2 py-2'>Welcome back!</h1>
      <LoginComp />
      <HrefBtnComp route="/" text="Go to /Register" />
    </main>
  )
}