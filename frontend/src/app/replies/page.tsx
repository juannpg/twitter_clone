import HrefBtnComp from "@/components/HrefBtnComp";
import SeeRepliesSec from "@/sections/SeeRepliesSec";
import { Suspense } from "react";
import { RepliesSkeleton } from "@/components/Skeleton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Watching replies",
};

export default function RepliesPage({ searchParams }: { searchParams: { seeRepliesId: string } }) {
  const seeRepliesId = searchParams.seeRepliesId;

  return (
    <main className='pt-7 flex flex-col mx-auto items-center justify-center w-[360px] md:w-[700px]'>
      <Suspense fallback={<RepliesSkeleton />}>
        <SeeRepliesSec seeRepliesId={seeRepliesId} />
      </Suspense>
      <HrefBtnComp route="/dashboard" text="Back" />
    </main>
  )
}