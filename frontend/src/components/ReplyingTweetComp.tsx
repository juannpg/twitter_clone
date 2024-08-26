"use client";

import { useEffect } from "react";
import { useState } from "react";

import TweetFeedComp from "./TweetFeedComp";

export default function ReplyingTweetComp() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [replyingTweetId, setReplyingTweetId] = useState('');
  const [replyingTweetContent, setReplyingTweetContent] = useState('');
  const [replyingTweetUsername, setReplyingTweetUsername] = useState('');

  useEffect(() => {
    const replyingTweetIdStored = localStorage.getItem('replyingTweetId');
    const replyingTweetContentStored = localStorage.getItem('replyingTweetContent');
    const replyingTweetUsernameStored = localStorage.getItem('replyingTweetUsername');

    setReplyingTweetId(replyingTweetIdStored ?? '');
    setReplyingTweetContent(replyingTweetContentStored ?? '');
    setReplyingTweetUsername(replyingTweetUsernameStored ?? '');

    setIsLoading(false);
  }, [])

  return (
    <main className="flex flex-col text-text text-center w-full px-3 py-2">
      {isLoading ? (
        <h1 className='text-text mb-2'>Loading...</h1>
      ) : (
        <>
          <div className='mt-1 mb-3 bg-opacity-50 bg-black px-3 py-2 border-none rounded-md '>
            {replyingTweetId && <h1 className="text-text font-semibold">Replying to {replyingTweetUsername}&apos;s tweet</h1>}
          </div>
          <TweetFeedComp id={Number(replyingTweetId)} content={replyingTweetContent} username={replyingTweetUsername} isReplying={true} />
        </>
      )}
    </main>
  )
}