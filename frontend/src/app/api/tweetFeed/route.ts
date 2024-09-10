import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const IP = process.env.NEXT_PUBLIC_SERVER_IP;

    const response = await fetch(`http://${IP}:4000/api/Tweets/getTweets`, { cache: 'no-store' } );
    const data = await response.json();
    const tweets = data.tweets;

    await new Promise(delay => setTimeout(delay, 3000));

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Failed to register:", errorResponse);
      return NextResponse.json({message: "error registering", error: errorResponse}, {status: 400});
    }

    return NextResponse.json(tweets, {status: 200});

  } catch (error) {
    return NextResponse.json({message: "error getting tweets", error}, {status: 500});
  }
}