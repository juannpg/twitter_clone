import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    const response = await fetch(`http://${IP}:4000/api/routers/replies/getReplies`, { cache: 'no-store' } );
    const data = await response.json();
    const replies = data.replies;
    
    await new Promise(delay => setTimeout(delay, 2500));

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Failed to register:", errorResponse);
      return NextResponse.json({message: "error registering", error: errorResponse}, {status: 400});
    }

    return NextResponse.json(replies, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "error getting replies", error}, {status: 500});
  }
}