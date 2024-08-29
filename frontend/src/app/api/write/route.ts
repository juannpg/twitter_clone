export async function POST(request: Request) {
  const { content, tweetId, endpoint, token } = await request.json();
  
  const IP = process.env.NEXT_PUBLIC_CASA_IP;
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
}