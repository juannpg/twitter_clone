"use client";

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  window.location.href = "/";
}

export default function LogoutBtnComp() {
  return(
    <button
      onClick={logout}
      className='mb-5 px-2 py-1 border-none bg-red-500 bg-opacity-40 rounded-md text-red-950 hover:text-primary hover:bg-red-400 hover:border-primary hover:rounded-md hover:scale-125 transition w-60'
    >Logout
    </button>
  )
}