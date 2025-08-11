import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-100 p-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800">
        PARKEE Parking POS
      </h1>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full max-w-lg">
        <Link href="/check-in" className="flex-1">
          <div className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-4 text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-700">
            <span className="font-semibold text-lg">Check-in Kendaraan</span>
          </div>
        </Link>
        <Link href="/check-out" className="flex-1">
          <div className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-4 text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-emerald-700">
            <span className="font-semibold text-lg">Check-out Kendaraan</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
