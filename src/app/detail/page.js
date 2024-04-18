'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const route = useRouter();

  return (
    <div className="w-11/12 sm:w-1/2 container mx-auto my-10">
      <div
        onClick={() => route.push('/')}
        className="text-blue-400 cursor-pointer hover:text-blue-600"
      >
        &larr; back
      </div>
      <h1 className="text-center font-bold text-2xl">
        {searchParams.get('title')}
      </h1>
      <p className="my-5">{searchParams.get('content')}</p>
      <p>{searchParams.get('published')}</p>
    </div>
  );
}
