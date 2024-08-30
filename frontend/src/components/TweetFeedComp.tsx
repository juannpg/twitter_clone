"use client";

const reply = ({ id, content, username }:{ id:number ,content:string, username:string }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  localStorage.setItem('replyingTweetId', id.toString());
  localStorage.setItem('replyingTweetContent', content);
  localStorage.setItem('replyingTweetUsername', username);
  window.location.href = "/reply";
}

const seeReplies = ({ id, content, username }:{ id:number ,content:string, username:string }) => {
  localStorage.setItem('seeRepliesId', id.toString());
  localStorage.setItem('seeRepliesContent', content);
  localStorage.setItem('seeRepliesUsername', username);
  
  const seeRepliesId = localStorage.getItem('seeRepliesId');

  if (!seeRepliesId) {
    return;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  fetch(`${apiBaseUrl}/api/tweetFeedSeeReplies?seeRepliesId=${seeRepliesId}`).then((response) => {
    if (!response.ok) {
      alert("Failed to fetch replies");
      throw new Error('Failed to fetch replies');
    }
  })
}

export default function TweetFeedComp({id ,content, username,  isReplying}:{id:number ,content:string, username:string, isReplying: boolean}) {  

  return(
    <main className='w-full flex flex-col text-left mb-4 relative'>
      <p className='text-primary font-bold'>@{username}</p>
      <div className='border rounded-lg px-2 py-1 mt-2'>
        <p>{content}</p>
      </div>
        {/* if the user is already replying or watching replies, then the reply and see replies buttons are hidden */}
        {isReplying == false && (
          <div className='flex items-center h-11'>
            <button 
              onClick={() => reply({ id, content, username })}
              className="bg-primary text-text rounded-md p-2 hover:bg-secondary hover:text-primary hover:scale-105 transition w-14 h-9 absolute right-0 bottom-2"
            >Reply</button>
            <a
              className='absolute right-16 underline' 
              onClick={() => seeReplies({ id, content, username })}
              href='/replies'
              >See replies</a>
          </div>
        )}
      <div className="border border-primary mt-1"></div>
    </main>
  )
}