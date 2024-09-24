"use client";

import { useState } from 'react'
import { useEffect } from 'react';

const register = ({ email, username, password, event }:{ email:string, username:string, password:string, event:React.FormEvent<HTMLFormElement> }) => {
  event.preventDefault();

  if (!email || !username || !password) {
    alert("provide all fields");
    return;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  fetch(`${apiBaseUrl}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    }),
  })
  
  .then((response) => {  
    if (!response.ok) {
      alert("Failed to register");
      throw new Error('Failed to register');
    }

    window.location.href = "./login";
  })
}

export default function RegisterComp() {
  useEffect(() => {
    localStorage.clear();
  }, [])
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  return(
    <main>
      <form
        className="flex flex-col text-center justify-center align-middle items-center"
        onSubmit={(event) => register({ email, username, password, event })}
      >
        <h1 className=" text-text mb-2">Register</h1>
        <input
          type="text"
          placeholder="Email"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-black w-96 mb-2"
        />
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-black w-96 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-black w-96 mb-2"
        />
        <button
          type="submit"
          className="bg-primary text-black rounded-md p-2 hover:bg-secondary hover:text-primary hover:scale-105 transition w-96">
          Register
        </button>
      </form>
    </main>
  )
}