"use client";
import ActivityInput from "../components/common/ActivityInput";

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
            suppressHydrationWarning
          />
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-lg"
                value={stop.arrival}
                onChange={(e) => {
                  const newArrival = e.target.value;

                  setCityStops((prev) =>
                    prev.map((c, i) => {
                      if (i === idx) {
                        const updatedStop = { ...c, arrival: newArrival };

                        // Clear departure if it becomes invalid
                        if (
                          c.departure &&
                          newArrival &&
                          new Date(c.departure) < new Date(newArrival)
                        ) {
                          updatedStop.departure = "";
                        }

                        // Clear activities that fall outside new date range
                        updatedStop.activities = c.activities.filter(
                          (activity) => {
                            if (!activity.startTime || !newArrival) return true;
                            const activityDate = new Date(activity.startTime)
                              .toISOString()
                              .split("T")[0];
                            const arrivalDateStr = newArrival;
                            const departureStr =
                              updatedStop.departure || newArrival;
                            return (
                              activityDate >= arrivalDateStr &&
                              activityDate <= departureStr
                            );
                          }
                        );

                        return updatedStop;
                      }
                      return c;
                    })
                  );
                }}
                placeholder="Arrival Date"
                min={startDate || new Date().toISOString().split("T")[0]}
                max={endDate || undefined}
                suppressHydrationWarning
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-lg"
                value={stop.departure}
                onChange={(e) => {
                  const newDeparture = e.target.value;

                  setCityStops((prev) =>
                    prev.map((c, i) => {
                      if (i === idx) {
                        const updatedStop = { ...c, departure: newDeparture };

                        // Clear activities that fall outside new date range
                        updatedStop.activities = c.activities.filter(
                          (activity) => {
                            if (!activity.startTime || !newDeparture)
                              return true;
                            const activityDate = new Date(activity.startTime)
                              .toISOString()
                              .split("T")[0];
                            const arrivalStr = c.arrival || startDate;
                            const departureStr = newDeparture;
                            return (
                              activityDate >= arrivalStr &&
                              activityDate <= departureStr
                            );
                          }
                        );

                        return updatedStop;
                      }
                      return c;
                    })
                  );
                }}
                onBlur={(e) => {
                  const dateValue = e.target.value;

                  // PROFESSIONAL VALIDATION: Only validate when user finishes input (onBlur)
                  if (
                    dateValue &&
                    dateValue.length === 10 &&
                    dateValue.includes("-")
                  ) {
                    const selectedDate = new Date(dateValue);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    selectedDate.setHours(0, 0, 0, 0);

                    // Check if date is valid and in the past
                    if (
                      !isNaN(selectedDate.getTime()) &&
                      selectedDate < today
                    ) {
                      alert(
                        "❌ City departure date cannot be in the past! Please select today's date or a future date."
                      );
                      setCityStops((prev) =>
                        prev.map((c, i) =>
                          i === idx ? { ...c, departure: "" } : c
                        )
                      );
                      e.target.focus();
                      return;
                    }

                    // Validate against trip dates and arrival date
                    const tripStart =
                      startDate && startDate.length === 10
                        ? new Date(startDate)
                        : null;
                    const tripEnd =
                      endDate && endDate.length === 10
                        ? new Date(endDate)
                        : null;
                    const arrivalDate =
                      stop.arrival && stop.arrival.length === 10
                        ? new Date(stop.arrival)
                        : null;

                    if (
                      tripStart &&
                      !isNaN(tripStart.getTime()) &&
                      selectedDate < tripStart
                    ) {
                      alert(
                        `❌ Departure date cannot be before trip start date (${startDate})`
                      );
                      setCityStops((prev) =>
                        prev.map((c, i) =>
                          i === idx ? { ...c, departure: "" } : c
                        )
                      );
                      e.target.focus();
                      return;
                    }
                    if (
                      tripEnd &&
                      !isNaN(tripEnd.getTime()) &&
                      selectedDate > tripEnd
                    ) {
                      alert(
                        `❌ Departure date cannot be after trip end date (${endDate})`
                      );
                      setCityStops((prev) =>
                        prev.map((c, i) =>
                          i === idx ? { ...c, departure: "" } : c
                        )
                      );
                      e.target.focus();
                      return;
                    }
                    if (
                      arrivalDate &&
                      !isNaN(arrivalDate.getTime()) &&
                      selectedDate < arrivalDate
                    ) {
                      alert(
                        `❌ Departure date cannot be before arrival date (${stop.arrival})`
                      );
                      setCityStops((prev) =>
                        prev.map((c, i) =>
                          i === idx ? { ...c, departure: "" } : c
                        )
                      );
                      e.target.focus();
                    }
                  }
                }}
                placeholder="Departure Date"
                min={
                  stop.arrival ||
                  startDate ||
                  new Date().toISOString().split("T")[0]
                }
                max={endDate || undefined}
                suppressHydrationWarning
              />
            </div>
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
            suppressHydrationWarning
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
        suppressHydrationWarning
      >
        Add City Stop
      </button>
    </div>
  );
}
