import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const { id, role } = await request.json();

    if (!authorization) {
      return NextResponse.json({message: "user is not admin"}, {status: 401});
    }
    const token = authorization.split(' ')[1];

    const response = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_IP}:4000/api/Admin/changeRole`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id as string,
        role: role as string,
      })
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