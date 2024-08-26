import TweetFeedComp from "@/components/TweetFeedComp";

async function fetchTweets() {
  const IP = process.env.NEXT_PUBLIC_CASA_IP;

  const response = await fetch(`http://${IP}:4000/api/routers/tweets/getTweets`, { cache: 'no-store' } );
  const data = await response.json();
  const tweets = data.tweets;

  await new Promise(delay => setTimeout(delay, 3000));

  return tweets;
}

export default async function TweetsFeedSec() {
  const tweets = await fetchTweets()

  return (
    <main className="flex flex-col text-text text-center bg-black bg-opacity-35 py-2 px-4 border-none rounded-xl mt-6 mb-5 w-[340px] md:w-[680px]">
      <h1>Recent Tweets:</h1>
        {tweets.map((tweet: { id:number ,content: string, username: string, likes: any[] }, index: number) => (
          <TweetFeedComp key={index} id={tweet.id} content={tweet.content} username={tweet.username} isReplying={false}  />
        ))}
    </main>
  )
}