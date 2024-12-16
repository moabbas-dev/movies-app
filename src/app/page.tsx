"use client"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  useEffect(() => router.push('/page/1'), [router]);  
  return (
    <>
      <div className="h-[calc(100vh-80px-56px)] flex justify-center items-center flex-col">
        <Image src="/images/ZKZg.gif"
          alt="Loading"
          width={30}
          height={30}/>
        <p>loading ...</p>
      </div>
    </>
  );
}
