import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    const response = await fetch(`http://${IP}:4000/api/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username as string,
        password: password as string,
      })
    })

    const data = await response.json();

    if (!response.ok) {
      const errorResponse = data;
      console.error("Failed to register:", errorResponse);
      return NextResponse.json({message: "error registering", error: errorResponse}, {status: 400});
    }

    return NextResponse.json(data, {status: 200});
    
  } catch (error) {
    return NextResponse.json({message: "error loging in", error}, {status: 500});
  }
}