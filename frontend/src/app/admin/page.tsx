"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [users, setUsers] = useState<any[]>([]);

  
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

  async function getUsers() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiBaseUrl}/api/admin/getUsers`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    setUsers(data);
  }

  return (
    <>
      {isAdmin == true ? (
        <main className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-4xl mb-1'>Admin Dashboard</h1>
          <div>
            <h2 className='text-3xl text-text mb-1'>Get Users</h2>
            <div className='flex flex-col items-center justify-center'>
              <button
                onClick={getUsers}
                >Get Users
              </button>
              <div>
                <pre>{JSON.stringify(users, null, 2)}</pre>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-3xl text-text mb-1'>Delete User</h2>
          </div>
          <div>
            <h2 className='text-3xl text-text mb-1'>Get Tweets</h2>
          </div>
          <div>
            <h2 className='text-3xl text-text mb-1'>Delete Tweet</h2>
          </div>
          <div>
            <h2 className='text-3xl text-text mb-1'>Get Replies</h2>
          </div>
          <div>
            <h2 className='text-3xl text-text mb-1'>Delete Replies</h2>
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