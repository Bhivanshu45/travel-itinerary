"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import TripCard from "./components/trip/TripCard";

export default function HomePage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(`${apiUrl}/api/trips/public`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTrips(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          console.error("API request timed out");
        } else {
          console.error("Error fetching trips:", error);
        }
        setTrips([]);
        setLoading(false);
      });

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">All Public Trips</h1>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : trips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No public trips found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
