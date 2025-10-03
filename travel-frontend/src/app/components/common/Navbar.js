"use client";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          🌍 Travel Planner
        </a>
        <div className="flex gap-6">
          <a href="/my-trips" className="hover:underline">
            My Trips
          </a>
          <a href="/create" className="hover:underline">
            Create Trip
          </a>
        </div>
      </div>
    </nav>
  );
}
