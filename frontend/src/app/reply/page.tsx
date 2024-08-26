import WriteComp from "@/components/WriteComp";
import ReplyingTweetComp from "@/components/ReplyingTweetComp";
import HrefBtnComp from "@/components/HrefBtnComp";
import { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Replying",
};

export default function ReplyPage() {

  return (
    <main className='mt-7 flex flex-col mx-auto items-center justify-center w-[360px] md:w-[700px] text-text bg-black bg-opacity-35 py-2 border-none rounded-xl'>
      <Suspense fallback={<h1 className='text-text mb-2'>Loading...</h1>}>
        <ReplyingTweetComp />
      </Suspense>
      <h1 className='mt-1 mb-1 bg-opacity-35 bg-black px-3 py-2 border-none rounded-md'>Your reply:</h1>
      <WriteComp endpoint="replies/replyTweet" action={``}/>
      <HrefBtnComp route="/dashboard" text="Cancel" />
    </main>
  )
}