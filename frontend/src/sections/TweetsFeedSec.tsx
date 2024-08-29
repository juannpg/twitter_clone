import TweetFeedComp from "@/components/TweetFeedComp";

async function getTweets(){
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}/api/tweetFeed`, {
      cache: 'no-store',
    });
    const data = await response.json();  
    return data;
  } catch (error) {
    console.error("Error getting tweets:", error);
    return {message: "error getting tweets", error, status: 500};
  }
}

export default async function TweetsFeedSec() {
  const tweets = await getTweets();

  return (
    <main className="flex flex-col text-text text-center bg-black bg-opacity-35 py-2 px-4 border-none rounded-xl mt-6 mb-5 w-[340px] md:w-[680px]">
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
    </main>
  )
}