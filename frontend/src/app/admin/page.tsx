import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Twitter Clone | Admin Dashboard",
};

export default function AdminPage() {
  return (
    <main className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl mb-1'>Admin Dashboard</h1>
    </main>
  );
}