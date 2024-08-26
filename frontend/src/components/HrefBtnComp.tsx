"use client";

export default function HrefBtnComp({route, text}:{route:string, text:string}) {

  return(
    <a
      href={route}
      className='mt-2 border-black bg-opacity-60 bg-black px-3 py-2 border-none rounded-md text-text hover:bg-secondary hover:border-primary hover:rounded-md hover:scale-125 transition mb-3'
      ><strong>{text}</strong>
    </a>
  )
}