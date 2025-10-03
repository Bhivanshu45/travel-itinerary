"use client";
import EditActivityForm from "./EditActivityForm";

export default function EditCityStopForm({
  cityStops,
  setEditForm,
  removeCityStop,
  addCityStop,
  removeActivity,
  addActivity,
  tripStart,
  tripEnd,
}) {
  return (
    <div className="mt-4">
      <label className="font-medium mb-2 block">City Stops</label>
      {cityStops.map((stop, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 mb-4 bg-gray-50 flex flex-col gap-2"
          style={{ boxSizing: "border-box", overflow: "hidden" }}
        >
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <input
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="City Name"
              value={stop.city}
              onChange={(e) => {
                const val = e.target.value;
                setEditForm((prev) => ({
                  ...prev,
                  cityStops: prev.cityStops.map((c, i) =>
                    i === idx ? { ...c, city: val } : c
                  ),
                }));
              }}
              required
            />
            <button
              type="button"
              className="ml-2 text-red-500 text-xs border px-2 py-1 rounded hover:bg-red-100"
              onClick={() => removeCityStop(idx)}
            >
              Remove City
            </button>
          </div>
          <div className="flex gap-2 mb-2 flex-wrap">
            <input
              type="date"
              className="flex-1 border px-3 py-2 rounded-lg"
              value={stop.arrival}
              min={tripStart || undefined}
              max={stop.departure ? stop.departure : tripEnd || undefined}
              onChange={(e) => {
                const val = e.target.value;
                setEditForm((prev) => {
                  const updatedStops = prev.cityStops.map((c, i) => {
                    if (i !== idx) return c;
                    let arrival = val;
                    let departure = c.departure;
                    // If new arrival > departure, auto-correct departure
                    if (departure && arrival > departure) departure = arrival;
                    return { ...c, arrival, departure };
                  });
                  return { ...prev, cityStops: updatedStops };
                });
              }}
              placeholder="Arrival Date"
            />
            <input
              type="date"
              className="flex-1 border px-3 py-2 rounded-lg"
              value={stop.departure}
              min={stop.arrival ? stop.arrival : tripStart || undefined}
              max={tripEnd || undefined}
              onChange={(e) => {
                const val = e.target.value;
                setEditForm((prev) => {
                  const updatedStops = prev.cityStops.map((c, i) => {
                    if (i !== idx) return c;
                    let departure = val;
                    let arrival = c.arrival;
                    // If new departure < arrival, auto-correct arrival
                    if (arrival && departure < arrival) arrival = departure;
                    return { ...c, arrival, departure };
                  });
                  return { ...prev, cityStops: updatedStops };
                });
              }}
              placeholder="Departure Date"
            />
          </div>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Transport"
            value={stop.transport}
            onChange={(e) => {
              const val = e.target.value;
              setEditForm((prev) => ({
                ...prev,
                cityStops: prev.cityStops.map((c, i) =>
                  i === idx ? { ...c, transport: val } : c
                ),
              }));
            }}
          />
          <EditActivityForm
            activities={stop.activities}
            cityIdx={idx}
            removeActivity={removeActivity}
            addActivity={addActivity}
            setEditForm={setEditForm}
            arrival={stop.arrival}
            departure={stop.departure}
          />
        </div>
      ))}
      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mb-4 w-full"
        onClick={addCityStop}
      >
        Add City Stop
      </button>
    </div>
  );
}
