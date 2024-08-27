import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const IP = process.env.NEXT_PUBLIC_CASA_IP;
  const res = await fetch(`http://${IP}:4000/api/routers/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  const data = await res.json();
  return NextResponse.json(data);
}