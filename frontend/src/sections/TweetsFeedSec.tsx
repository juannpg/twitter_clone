import TweetFeedComp from "@/components/TweetFeedComp";

async function getTweets(){
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiBaseUrl}/api/tweetFeed`, {
    // don't cache the response so that the tweets are always fresh
    cache: 'no-store',
  });

  if (!response.ok) {
    const ok = false;
    console.log("failed to fetch replies");
    return ok;
  }

  const data = await response.json();  
  return data;
}

export default async function TweetsFeedSec() {
  const tweets = await getTweets();

  return (
    <main className="flex flex-col text-text text-center bg-black bg-opacity-35 py-2 px-4 border-none rounded-xl mt-6 mb-5 w-[340px] md:w-[680px]">
      {tweets === false ? (
        <h1 className='text-text mb-2'>500 | Error getting tweets.</h1>
      ) : !tweets || tweets.length === 0 ? (
        <h1 className="text-text mb2">No tweets available</h1>
      ) : (
        <>
          <h1>Recent Tweets:</h1>
          {tweets.map((tweet: { id:number ,content: string, username: string, likes: any[] }, index: number) => (
            <TweetFeedComp
              key={index}
              id={tweet.id}
              content={tweet.content}
              username={tweet.username}
              isReplying={false}
            />
          ))}
        </>
      )}
      </main>
  )
}