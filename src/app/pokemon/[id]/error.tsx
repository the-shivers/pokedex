'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PokemonError({
  error,
}: {
  error: Error & { digest?: string };
}) {

  let title = "Something Went Wrong!";
  let message = error.message || 'An unexpected error occurred.';
  if (error.name === 'NotFoundError') {
    title = "Pokémon Not Found!";
    message = error.message;
  } else if (error.name === 'FetchError') {
    title = "Data Fetching Error";
    message = `Could not load Pokémon data. ${error.message}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Image
        src="/surprised_pikachu.jpg"
        alt="Surprised Pikachu face"
        width={250}
        height={250}
        className="mb-6 rounded-lg shadow-md"
        priority
      />
      <h1 className="text-3xl font-bold mb-4">A Wild Error Appeared! ({title})</h1>
      <p className="text-lg mb-6">{message}</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-md shadow-sm transition-colors bg-blue-600 hover:bg-blue-500 text-white text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-700"
      >
        Run Away!
      </Link>
    </div>
  );
}