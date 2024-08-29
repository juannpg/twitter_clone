import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content, tweetId, endpoint, token } = await request.json();
    
    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    fetch(`http://${IP}:4000/api/routers/${endpoint}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: content,
        tweetId: tweetId,
      })
    })

    return new NextResponse(null, { status: 200 });
  
  } catch (error) {
    return NextResponse.json({message: "error writing tweet", error, status: 500});
  }
}