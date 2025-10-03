"use client";
import ActivityInput from "../../../../travel-frontend/src/app/components/common/ActivityInput";

export default function CityStopForm({
  cityStops,
  setCityStops,
  startDate,
  endDate,
  addActivity,
  addCityStop,
}) {
  return (
    <div>
      <label className="font-medium">City Stops</label>
      {cityStops.map((stop, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-4 bg-gray-50">
          <input
            className="w-full border px-3 py-2 rounded-lg mb-2"
            placeholder="City Name"
            value={stop.city}
            onChange={(e) => {
              const val = e.target.value;
              setCityStops((prev) =>
                prev.map((c, i) => (i === idx ? { ...c, city: val } : c))
              );
            }}
            required
          />
          <div className="flex gap-2 mb-2">
            <input
              type="date"
              className="flex-1 border px-3 py-2 rounded-lg"
              value={stop.arrival}
              onChange={(e) => {
                const val = e.target.value;
                setCityStops((prev) =>
                  prev.map((c, i) => (i === idx ? { ...c, arrival: val } : c))
                );
                if (stop.departure && val && stop.departure < val) {
                  setCityStops((prev) =>
                    prev.map((c, i) =>
                      i === idx ? { ...c, departure: "" } : c
                    )
                  );
                }
              }}
              placeholder="Arrival Date"
              min={startDate || undefined}
              max={endDate || undefined}
            />
            <input
              type="date"
              className="flex-1 border px-3 py-2 rounded-lg"
              value={stop.departure}
              onChange={(e) => {
                const val = e.target.value;
                setCityStops((prev) =>
                  prev.map((c, i) => (i === idx ? { ...c, departure: val } : c))
                );
              }}
              placeholder="Departure Date"
              min={stop.arrival || startDate || undefined}
              max={endDate || undefined}
            />
          </div>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-2"
            placeholder="Transport"
            value={stop.transport}
            onChange={(e) => {
              const val = e.target.value;
              setCityStops((prev) =>
                prev.map((c, i) => (i === idx ? { ...c, transport: val } : c))
              );
            }}
          />
          <div>
            <label className="font-medium">Activities</label>
            <ActivityInput
              onAdd={(activityObj) => addActivity(activityObj, idx)}
              minTime={stop.arrival ? stop.arrival + "T00:00" : undefined}
              maxTime={stop.departure ? stop.departure + "T23:59" : undefined}
            />
            <ul className="mt-2 text-gray-700">
              {stop.activities.map((a, i) => (
                <li key={i} className="text-sm">
                  • {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        onClick={addCityStop}
      >
        Add City Stop
      </button>
    </div>
  );
}
