"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import TripCard from "../components/trip/TripCard";

export default function AllTripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/public`)
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      });
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
