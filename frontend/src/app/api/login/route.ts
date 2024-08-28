import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const IP = process.env.NEXT_PUBLIC_CASA_IP;
  // tienes q esperar el fetch para q la función no acabe antes de que el fetch termine. SI eso pasa, el frontend no recibe el fetch cuando la funcion acaba.
  const response = await fetch(`http://${IP}:4000/api/routers/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username as string,
      password: password as string,
    })
  })

  const data = await response.json();
  return NextResponse.json(data);

  // sin el await, la función termina
}