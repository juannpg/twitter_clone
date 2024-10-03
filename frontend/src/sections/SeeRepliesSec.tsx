
import RepliesTweetComp from "@/components/RepliesTweetComp";
import TweetFeedComp from "@/components/TweetFeedComp";

async function fetchReplies(seeRepliesId: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiBaseUrl}/api/seeReplies?id=${seeRepliesId}`, {
    // don't cache the response so that the tweets are always fresh
    cache: 'no-store'
  });

  if (!response.ok) {
    const ok = false;
    console.log("failed to fetch replies");
    return ok;
  }

  const data = await response.json();
  return data;

}

export default async function SeeRepliesSec({seeRepliesId}:{seeRepliesId:string}) {
  const replies = await fetchReplies(seeRepliesId);

  return (
    <main className="flex flex-col text-text text-center bg-black bg-opacity-35 py-2 px-4 border-none rounded-xl mt-6 mb-5 w-[340px] md:w-[680px]">
      <RepliesTweetComp />
      {replies === false ? (
        <h1 className='text-text mb-2'>500 | Error getting replies.</h1>
      ) : !replies || replies.length === 0 ? (
        <h1 className="text-text mb2">No replies available</h1>
      ) : (
        <>
        <h2>Replies:</h2><div className='flex flex-col items-end bg-black bg-opacity-20 border-none rounded-xl px-3 py-2 mt-2 mb-2'>
          <div className='w-5/6'>
            {replies.map((reply: { id: number; content: string; username: string; }, index: number) => (
              <TweetFeedComp
                key={index}
                id={reply.id}
                content={reply.content}
                username={reply.username}
                likes={0}
                isReplying={true}
              />
            ))}
          </div>
        </div>
      </>
      )}
    </main>
  )
}