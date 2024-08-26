"use client";

import { useState } from 'react'
import { useEffect } from 'react'

export default function UsernameComp() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [username, setUsername] = useState('')

  useEffect(() => {
    const usernameStored = localStorage.getItem('username');
    setUsername(usernameStored ?? '');

    setIsLoading(false);
  }, [])

  return (
    <>
      {isLoading ? (
        <h1 className='text-primary mb-4 text-4xl hover:-rotate-12 transition bg-black bg-opacity-30 py-2 px-4 border-none rounded-xl hover:bg-secondary hover:border-dashed'>Loading...</h1>
      ) : (
        <h1 className='text-primary mb-4 text-4xl hover:-rotate-12 transition bg-black bg-opacity-30 py-2 px-4 border-none rounded-xl hover:bg-secondary hover:border-dashed'>Dashboard of {username}</h1>
      )}
    </>
  )
}