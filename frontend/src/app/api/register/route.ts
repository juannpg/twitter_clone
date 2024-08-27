import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  const IP = process.env.NEXT_PUBLIC_CASA_IP;
  return fetch(`http://${IP}:4000/api/routers/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })
  })
    .then(res => {
      return NextResponse.json(res);
    })
}