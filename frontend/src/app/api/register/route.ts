import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    const response = await fetch(`http://${IP}:4000/api/routers/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email as string,
        username: username as string,
        password: password as string
      })
    })

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Failed to register:", errorResponse);
      return NextResponse.json({message: "error registering", error: errorResponse}, {status: 400});
    }

    return NextResponse.json(response, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "error registering", error}, {status: 500});
  }
}