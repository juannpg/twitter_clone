"use client";

import { useState } from 'react'
import { useEffect } from 'react';

const login = ({ username, password, event }:{ username:string, password:string, event:React.FormEvent<HTMLFormElement> }) => {
  event.preventDefault();

  if (!username || !password) {
    alert("provide all fields");
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    }),
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.user.token)
      localStorage.setItem('username', data.user.username)
      window.location.href = "/dashboard";
    })
}

export default function LoginComp() {
  useEffect(() => {
    localStorage.clear();
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return(
    <main>
      <form
        className="flex flex-col text-center justify-center align-middle items-center"
        onSubmit={(event) => login({ username, password, event })}
      >
        <h1 className=" text-text mb-2">Login</h1>
        <input
          type="text"
          placeholder="Username"
          autoComplete="on"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-primary w-96 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-primary rounded-md p-2 text-primary w-96 mb-2"
        />
        <button
          type="submit"
          className="bg-primary text-text rounded-md p-2 hover:text-primary hover:bg-secondary hover:scale-105 transition w-96">
          Login
        </button>
      </form>
    </main>
  )
}