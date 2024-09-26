"use client";

import { useEffect, useState } from "react";

export default function AdminPageBtn() {
  const [isAdmin, setIsAdmin] = useState(false);

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

  return(
    <>
      {isAdmin ? (
            <a
            className='mt-2 border-black bg-opacity-60 bg-black px-3 py-2 border-none rounded-md text-text hover:bg-secondary hover:border-primary hover:rounded-md hover:scale-125 transition mb-3'
            href="/admin"
            ><strong>Admin Dashboard</strong>
          </a>
      ) : (
        <>
        </>
      )}
    </>

  )
}