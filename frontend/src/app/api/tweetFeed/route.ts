import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const IP = process.env.NEXT_PUBLIC_SERVER_IP;

    const response = await fetch(`http://${IP}:4000/api/routers/tweets/getTweets`, { cache: 'no-store' } );
    const data = await response.json();
    const tweets = data.tweets;

    await new Promise(delay => setTimeout(delay, 3000));

    return NextResponse.json(tweets);

  } catch (error) {
    return NextResponse.json({message: "error getting tweets", error, status: 500});
  }
}