"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          🌍 Travel Planner
        </Link>
        <div className="flex gap-6">
          <Link href="/my-trips" className="hover:underline">
            My Trips
          </Link>
          <Link href="/create" className="hover:underline">
            Create Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
