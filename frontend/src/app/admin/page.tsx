"use client";

import './scrollbar.css';

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [text, setText] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [adminId, setAdminId] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [replyId, setReplyId] = useState("");

  // transition made with chatgpt
  const [fade, setFade] = useState(false);
  const [fade2, setFade2] = useState(false);

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
    const message = data.data;

    // transition made with chatgpt
    setFade2(true); // Trigger fade-out
    setTimeout(() => {
      setResponse(message);
      setFade2(false); // Trigger fade-in
    }, 300); // Duration of fade-out

    setUserId("");
    setTweetId("");
    setReplyId("");
  }

  async function changeRole({id, role}:{id:string, role:string}) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem('token');

    if (!id || !role) {
      alert("id and role required")
    }

    const response = await fetch(`${apiBaseUrl}/api/admin/changeRole`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id as string,
        role: role as string,
      })
    });
    const data = await response.json();
    const message = data.data;

    // transition made with chatgpt
    setFade2(true); // Trigger fade-out
    setTimeout(() => {
      setResponse(message);
      setFade2(false); // Trigger fade-in
    }, 300); // Duration of fade-out

    setAdminId("");
    setRole("");
  }

  return (
    <>
      {isAdmin ? (
        <main className='py-10 flex flex-col md:flex-row items-center justify-center'>
          <div className="mr-2">
            <div>
              <button
                className='w-full mb-1 h-9 text-xl text-black px-2 bg-primary hover:bg-secondary hover:text-primary transition'
                onClick={() => window.location.href = "/dashboard"}
              >Go Home</button>
            </div>
            <div className='flex align-middle py-1'>
              <input
                className="w-9 h-9 mr-1 text-center"
                placeholder="id"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                type="text"
              ></input>
              <input
                className="w-9 h-9 mr-1 text-center"
                placeholder="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
              ></input>
              <button
                className='w-[280px] h-9 text-xl text-black px-2 bg-secondary hover:bg-primary hover:text-secondary transition'
                onClick={() => changeRole({id: adminId, role: role})}
              >Change Role</button>
            </div>
            <div className='flex align-middle py-1'>
              <input
                className="w-9 h-9 mr-1 text-center"
                placeholder="id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="text"
              ></input>
              <button
                className='w-80 h-9 text-xl text-black px-2 bg-secondary hover:bg-primary hover:text-secondary transition'
                onClick={() => deleteX({endpoint: "deleteUser", id: userId})}
              >Delete User</button>
            </div>
            <div className='flex align-middle py-1'>
              <input
                className="w-9 h-9 mr-1 text-center"
                placeholder="id"
                value={tweetId}
                onChange={(e) => setTweetId(e.target.value)}
                type="text"
              ></input>
              <button
                className='w-80 h-9 text-xl text-black px-2 bg-secondary hover:bg-primary hover:text-secondary transition'
                onClick={() => deleteX({endpoint: "deleteTweet", id: tweetId})}
              >Delete Tweet</button>
            </div>
            <div className='flex align-middle py-1'>
              <input
                className="w-9 h-9 mr-1 text-center"
                placeholder="id"
                value={replyId}
                onChange={(e) => setReplyId(e.target.value)}
                type="text"
              ></input>
              <button
                className='w-80 h-9 text-xl text-black px-2 bg-secondary hover:bg-primary hover:text-secondary transition'
                onClick={() => deleteX({endpoint: "deleteReply", id: replyId})}
              >Delete Reply</button>
            </div>
            <div className="w-full h-48 text-white bg-background-darker p-2 mt-2 overflow-y-scroll overflow-x-scroll hide-scrollbar">
              {/* transition made with chatgpt */}
              <pre className={`transition-opacity duration-300 ${fade2 ? 'opacity-0' : 'opacity-100'}`}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full gap-1">
              <button
                className='flex-1 hover:flex-[2] px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition-all duration-300'
                onClick={() => getX({endpoint: "getUsers"})}
                >Get Users
              </button>
              <button
                className='flex-1 hover:flex-[2] px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition-all duration-300'
                onClick={() => getX({endpoint: "getTweets"})}
                >Get Tweets
              </button>
              <button
                className='flex-1 hover:flex-[2] px-2 bg-secondary text-text hover:bg-primary hover:text-background-darker transition-all duration-300'
                onClick={() => getX({endpoint: "getReplies"})}
                >Get Replies
              </button>
            </div>
            <div className="bg-background-darker text-white p-2 mt-2 w-72 md:w-[490px] h-96 overflow-y-scroll overflow-x-scroll hide-scrollbar">
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
