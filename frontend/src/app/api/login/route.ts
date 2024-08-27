import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
    }

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
      
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}