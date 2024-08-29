import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  try {
    const seeRepliesId = request.nextUrl.searchParams.get('seeRepliesId');

    const IP = process.env.NEXT_PUBLIC_SERVER_IP;
    fetch(`http://${IP}:4000/api/routers/replies/getRepliesTweet?id=${seeRepliesId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return new NextResponse(null, { status: 200 });

  } catch (error) {
    return NextResponse.json({message: "error getting replies tweet", error, status: 500 });
  }
}