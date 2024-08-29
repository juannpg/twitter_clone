import TweetsFeedSec from "@/sections/TweetsFeedSec";
import WriteComp from "@/components/WriteComp";
import LogoutBtnComp from "@/components/LogoutBtnComp";
import UsernameComp from "@/components/UsernameComp";
import DeleteStorageHook from "@/hooks/DeleteStorageHook";
import { Suspense } from "react";
import { TweetFeedSkeleton } from "@/components/Skeleton";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Twitter Clone | Dashboard",
};

export default function DashboardPage() {

  return (
    <main className='pt-7 flex flex-col mx-auto items-center justify-center w-[360px] md:w-[700px]'>
      {/* null component to delete storage and use a CSR hook in a SSR page*/}
      <DeleteStorageHook />

      <UsernameComp />
      <LogoutBtnComp />
      <WriteComp endpoint="tweets/createTweet" action="create_tweet" title="Create a tweet"/>
      <Suspense fallback={<TweetFeedSkeleton />}>
        <TweetsFeedSec />
      </Suspense>
    </main>
  )
}