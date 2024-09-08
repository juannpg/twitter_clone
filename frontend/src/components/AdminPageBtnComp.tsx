"use client";

const checkAdmin = async () => {
  const token = localStorage.getItem('token');
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiBaseUrl}/api/verifyAdmin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
    })
  });

  if (!response.ok) {
    alert("user is not admin");
    return;
  }
  window.location.href = "/admin";
}

export default function AdminPageBtn() {

  return(
    <button
      className='mt-2 border-black bg-opacity-60 bg-black px-3 py-2 border-none rounded-md text-text hover:bg-secondary hover:border-primary hover:rounded-md hover:scale-125 transition mb-3'
      onClick={checkAdmin}
      ><strong>Admin Dashboard</strong>
    </button>
  )
}