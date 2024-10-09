import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tweetId, token } = await request.json();
    
    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    fetch(`http://${IP}:4000/api/Likes/likeTweet`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        tweetId: tweetId as string
      })
    })
    
    .then(response => {
      if (!response.ok) {
        const errorResponse = response.json();
        console.error("Failed to write:", errorResponse);
        return NextResponse.json({message: "error liking", error: errorResponse}, {status: 400});
      }
    })
    
    return new NextResponse(null, { status: 200 });
  
  } catch (error) {
    return NextResponse.json({message: "error liking tweet", error}, {status: 500});
  }
}