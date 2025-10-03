import Navbar from "../../components/common/Navbar";
import ItineraryTimeline from "./ItineraryTimeline";

async function fetchTrip(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/${id}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function TripPage({ params }) {
  const { id } = await params;
  const trip = await fetchTrip(id);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{trip.name}</h1>
        {trip.description && (
          <p className="text-gray-300 mb-2">{trip.description}</p>
        )}
        <p className="text-gray-400">{trip.destination}</p>
        <p className="text-gray-200 mb-4">
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
        <div className="bg-gray-50 rounded-xl p-6 mt-2">
          <div className="mb-4">
            <span className="font-bold text-blue-700">Trip Summary:</span>
            <span className="ml-4 text-sm text-gray-600">
              Total Days:{" "}
              {trip.cityStops
                ? [
                    ...new Set(
                      trip.cityStops.flatMap((cs) =>
                        cs.activities.map((a) =>
                          new Date(a.startTime).toLocaleDateString()
                        )
                      )
                    ),
                  ].length
                : 0}
            </span>
            <span className="ml-4 text-sm text-gray-600">
              Total Activities:{" "}
              {trip.cityStops
                ? trip.cityStops.reduce(
                    (acc, cs) => acc + cs.activities.length,
                    0
                  )
                : 0}
            </span>
            <span className="ml-4 text-sm text-gray-600">
              Total Cities: {trip.cityStops ? trip.cityStops.length : 0}
            </span>
          </div>
          <div>
            {/* Vertical timeline grouped by day */}
            <div className="mt-4">
              {/* Dynamically import the timeline component */}
              {trip.cityStops && trip.cityStops.length > 0 ? (
                <div>
                  <ItineraryTimeline cityStops={trip.cityStops} />
                </div>
              ) : (
                <p className="text-gray-400">
                  No city stops added to this trip.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
