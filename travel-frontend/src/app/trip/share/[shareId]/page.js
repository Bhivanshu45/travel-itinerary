"use client";
import { useEffect, useState } from "react";
import { getCityImageUrl } from "../../../utils/unsplash";
import { useParams } from "next/navigation";
import Navbar from "../../../components/common/Navbar";
import ItineraryTimeline from "../../[id]/ItineraryTimeline";

export default function TripSharePage() {
  const { shareId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);

  useEffect(() => {
    if (!shareId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/share/${shareId}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
        // Fetch Unsplash image for first city
        const city = data?.cityStops?.[0]?.city;
        if (city) {
          setLoadingImg(true);
          getCityImageUrl(city).then((url) => {
            setImageUrl(url);
            setLoadingImg(false);
          });
        }
      });
  }, [shareId]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : !trip ? (
          <div className="text-center py-8 text-gray-500">Trip not found.</div>
        ) : (
          <>
            {loadingImg ? (
              <div className="w-full h-56 bg-gray-100 rounded-xl animate-pulse mb-4" />
            ) : (
              <img
                src={imageUrl || "/globe.svg"}
                alt={trip.cityStops?.[0]?.city || "Destination"}
                className="w-full h-56 object-cover rounded-xl mb-4 border"
              />
            )}
            <h1 className="text-2xl font-bold mb-2">{trip.name}</h1>
            <p className="text-gray-600 mb-2">{trip.description}</p>
            <p className="text-sm text-gray-400 mb-4">
              {new Date(trip.startDate).toLocaleDateString()} -{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <ItineraryTimeline cityStops={trip.cityStops} />
          </>
        )}
      </div>
    </div>
  );
}
