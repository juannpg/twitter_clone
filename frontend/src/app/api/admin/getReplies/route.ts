import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');

    if (!authorization) {
      return NextResponse.json({message: "user is not admin"}, {status: 401});
    }
    const token = authorization.split(' ')[1];

    const response = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_IP}:4000/api/Admin/getReplies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status == 401) {
      return NextResponse.json({message: "user is not admin"}, {status: 401});
    }
    
    const data = await response.json();
    if (data == false) {
      return NextResponse.json({message: "user is not admin"}, {status: 401});
    }
    
    return NextResponse.json({data}, {status: 200});

  } catch (error) {
    return NextResponse.json({message: "error", error}, {status: 500});
  }
}