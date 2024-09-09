"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  async function checkAdmin() {
    const token = localStorage.getItem('token');
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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

  return (
    <>
      {isAdmin == true ? (
        <main className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-4xl mb-1'>Admin Dashboard</h1>
          <div>
            <h2>Get Users</h2>
          </div>
          <div>
            <h2>Delete User</h2>
          </div>
          <div>
            <h2>Get Tweets</h2>
          </div>
          <div>
            <h2>Delete Tweet</h2>
          </div>
          <div>
            <h2>Get Replies</h2>
          </div>
          <div>
            <h2>Delete Replies</h2>
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