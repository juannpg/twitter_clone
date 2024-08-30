"use client";

import { useState, useEffect } from "react";

import TweetFeedComp from "./TweetFeedComp";

export default function ReplyingTweetComp() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [seeRepliesId, setSeeRepliesId] = useState('');
  const [seeRepliesContent, setSeeRepliesContent] = useState('');
  const [seeRepliesUsername, setSeeRepliesUsername] = useState('');

  useEffect(() => {
    const seeRepliesIdStored = localStorage.getItem('seeRepliesId');
    const seeRepliesContentStored = localStorage.getItem('seeRepliesContent');
    const seeRepliesUsernameStored = localStorage.getItem('seeRepliesUsername');

    setSeeRepliesId(seeRepliesIdStored ?? '');
    setSeeRepliesContent(seeRepliesContentStored ?? '');
    setSeeRepliesUsername(seeRepliesUsernameStored ?? '');

    setIsLoading(false);
  }, [])

  return (
    <main className="flex flex-col text-text text-center">
      {isLoading ? (
        <h1 className='text-text mb-2'>Loading...</h1>
      ) : (
        <>
          {seeRepliesId && seeRepliesContent && seeRepliesUsername ? (
            <> 
              <div className='mt-1 mb-3 bg-opacity-50 bg-black px-3 py-2 border-none rounded-md'>
                {seeRepliesId && <h1 className="text-text font-semibold">Replies to {seeRepliesUsername}&apos;s tweet</h1>}
              </div>
                <TweetFeedComp id={Number(seeRepliesId)} content={seeRepliesContent} username={seeRepliesUsername} isReplying={true} />
            </>
          ) : (
            <h1 className='text-text mb-2'>Not found | 404</h1>
          )}
        </>
      )}
    </main>
  )
}