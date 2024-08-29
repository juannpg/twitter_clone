import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const IP = process.env.NEXT_PUBLIC_CASA_IP;
  const response = await fetch(`http://${IP}:4000/api/routers/replies/getReplies`, { cache: 'no-store' } );
  const data = await response.json();
  const replies = data.replies;
  
  await new Promise(delay => setTimeout(delay, 2500));

  return NextResponse.json(replies);
}