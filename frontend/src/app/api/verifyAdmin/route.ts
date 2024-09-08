import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const response = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_IP}:4000/api/admin/verifyAdmin`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();

    if (data == false) {
      return NextResponse.json({message: "user is not admin"}, {status: 400});
    }
    
    return NextResponse.json({message: "user is admin"}, {status: 200});

  } catch (error) {
    return NextResponse.json({message: "error", error}, {status: 500});
  }
}