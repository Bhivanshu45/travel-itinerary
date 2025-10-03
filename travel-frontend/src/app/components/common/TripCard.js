"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCityImageUrl } from "../../utils/unsplash";

export default function TripCard({
  trip,
  showActions = false,
  onEdit,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);
  const destination = trip.cityStops?.[0]?.city || "";
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/trip/share/${trip.shareId}`
      : `/trip/share/${trip.shareId}`;

  useEffect(() => {
    if (!destination) return;
    let cancelled = false;
    setLoadingImg(true);
    getCityImageUrl(destination).then((url) => {
      if (!cancelled) {
        setImageUrl(url);
        setLoadingImg(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [destination]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col gap-2">
      {loadingImg ? (
        <div className="w-full h-40 bg-gray-100 rounded-lg animate-pulse mb-2" />
      ) : (
        <Image
          src={imageUrl || "/globe.svg"}
          alt={destination}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-2 border"
        />
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{trip.name}</h2>
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            trip.isPublic
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {trip.isPublic ? "Public" : "Private"}
        </span>
      </div>
      <p className="text-sm text-gray-500">
        {trip.cityStops?.map((c) => c.city).join(", ")}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        {new Date(trip.startDate).toLocaleDateString()} -{" "}
        {new Date(trip.endDate).toLocaleDateString()}
      </p>
      <div className="flex gap-3 mt-2">
        <Link
          href={`/trip/share/${trip.shareId}`}
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          View Itinerary →
        </Link>
        <button
          type="button"
          onClick={copyShareLink}
          className={`inline-block text-xs px-2 py-1 rounded border transition-colors duration-200 ${
            copied
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-900"
          }`}
        >
          {copied ? "Link Copied!" : "Copy Link"}
        </button>
        {showActions && (
          <>
            <button
              type="button"
              onClick={() => onEdit && onEdit(trip)}
              className="inline-block text-xs px-2 py-1 rounded border border-yellow-400 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 ml-2"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete && onDelete(trip)}
              className="inline-block text-xs px-2 py-1 rounded border border-red-400 text-red-700 bg-red-50 hover:bg-red-100 ml-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
