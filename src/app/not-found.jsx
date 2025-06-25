import Link from "next/link";

export default function NotFound() {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div>
        <h1 className='text-7xl'>Page Not Found</h1>
        <div className='mt-2 text-[#d5eceb]'>
            <Link href="/">Return Home</Link>
        </div>
      </div>
    </div>
  
  );
}
