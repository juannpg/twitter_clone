"use client";

import './scrollbar.css';

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [text, setText] = useState<any>();
  const [userId, setUserId] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [replyId, setReplyId] = useState("");

  // transition made with chatgpt
  const [fade, setFade] = useState(false);

  async function checkAdmin() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${apiBaseUrl}/api/verifyAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      })
    });
  
    if (!response.ok) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  async function getX({endpoint}:{endpoint:string}) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiBaseUrl}/api/admin/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    
    // transition made with chatgpt
    setFade(true); // Trigger fade-out
    setTimeout(() => {
      setText(data);
      setFade(false); // Trigger fade-in
    }, 300); // Duration of fade-out
  }

  async function deleteX({endpoint, id}:{endpoint:string, id:string}) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem('token');

    if (!id) {
      alert("id required")
    }

    const response = await fetch(`${apiBaseUrl}/api/admin/${endpoint}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id as string,
      })
    })
    
    const data = await response.json();

    // transition made with chatgpt
    setFade(true); // Trigger fade-out
    setTimeout(() => {
      setText(data);
      setFade(false); // Trigger fade-in
    }, 300); // Duration of fade-out

    setUserId("");
    setTweetId("");
    setReplyId("");
  }

  return (
    <>
      {isAdmin ? (
        <main className='h-screen flex flex-col md:flex-row items-center justify-center'>
          <div>
            <div>
              <input
                className="w-10 h-10"
                placeholder="id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="text"
              ></input>
              <button
                className='text-xl text-text mb-1 border-none rounded-md px-2 bg-primary hover:bg-secondary hover:text-primary transition'
                onClick={() => deleteX({endpoint: "deleteUser", id: userId})}
              >Delete User</button>
            </div>
            <div>
              <input
                className="w-10 h-10"
                placeholder="id"
                value={tweetId}
                onChange={(e) => setTweetId(e.target.value)}
                type="text"
              ></input>
              <button
                className='text-xl text-text mb-1 border-none rounded-md px-2 bg-primary hover:bg-secondary hover:text-primary transition'
                onClick={() => deleteX({endpoint: "deleteTweet", id: tweetId})}
              >Delete Tweet</button>
            </div>
            <div>
              <input
                className="w-10 h-10"
                placeholder="id"
                value={replyId}
                onChange={(e) => setReplyId(e.target.value)}
                type="text"
              ></input>
              <button
                className='text-xl text-text mb-1 border-none rounded-md px-2 bg-primary hover:bg-secondary hover:text-primary transition'
                onClick={() => deleteX({endpoint: "deleteReply", id: replyId})}
              >Delete Reply</button>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full gap-1">
              <button
                className='flex-1 border-none rounded-md px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition'
                onClick={() => getX({endpoint: "getUsers"})}
                >Get Users
              </button>
              <button
                className='flex-1 border-none rounded-md px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition'
                onClick={() => getX({endpoint: "getTweets"})}
                >Get Tweets
              </button>
              <button
                className='flex-1 border-none rounded-md px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition'
                onClick={() => getX({endpoint: "getReplies"})}
                >Get Replies
              </button>
            </div>
            <div className="bg-background-darker rounded-lg p-2 mt-2 w-72 md:w-[490px] h-96 overflow-y-scroll overflow-x-scroll hide-scrollbar">
              {/* transition made with chatgpt */}
              <pre className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {JSON.stringify(text, null, 2)}
              </pre>
            </div>
          </div>
        </main>
      ) : (
        <main className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-4xl mb-1'>Admin Dashboard</h1>
          <p className='text-text mb-1'>You are not an admin</p>
        </main>
      )}
    </>
  );
}
