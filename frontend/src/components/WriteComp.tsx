"use client";

import { useState } from 'react'

const write = ({ endpoint, action, content }:{ endpoint:string, action:string, content:string }) => {
  const token = localStorage.getItem('token');  
  const replyingTweetId = localStorage.getItem('replyingTweetId') || 'noReply';
  const location = window.location.pathname;

  if (!token) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  if (replyingTweetId === 'noReply' && location === '/reply') {
    alert("why are u here?");
    window.location.href = "/dashboard";
    return;
  }

  if (!content || content.length > 250) {
    alert("Invalid content");
    return;
  }

  fetch('http://localhost:3000/api/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
      tweetId: replyingTweetId,
      endpoint: endpoint,
      token: token,
    })
  }).then(() => {

    if (action === 'create_tweet') {
      window.location.href = "/dashboard"
    } else if (action === 'reply_tweet') {
      localStorage.setItem('seeRepliesId', replyingTweetId.toString());
      window.location.href = "/replies"
    }

    localStorage.removeItem('replyingTweetId');
    localStorage.removeItem('replyingTweetContent');
    localStorage.removeItem('replyingTweetUsername');
  })
}

export default function WriteComp({ endpoint, action }:{ endpoint:string, action:string }) {
  const [content, setContent] = useState('')
  
  return(
    <main className='w-[340px] md:w-[680px]'>
      <h1 className="text-primary font-semibold mb-2">{action}</h1>
      <div className="relative">
        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-primary w-full h-28 mb-2"
        />
        <button
          onClick={() => write({ endpoint, action, content })}
          className="bg-primary text-text rounded-md p-2 hover:bg-secondary hover:text-primary hover:scale-105 transition w-28 absolute right-2 bottom-5">
          Create
        </button>
      </div>
    </main>
  )
}