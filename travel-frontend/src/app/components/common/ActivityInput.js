"use client";
import { useState } from "react";

export default function ActivityInput({ onAdd }) {
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const minTime =
    typeof window !== "undefined" &&
    typeof arguments[0] !== "undefined" &&
    arguments[0].minTime
      ? arguments[0].minTime
      : undefined;
  const maxTime =
    typeof window !== "undefined" &&
    typeof arguments[0] !== "undefined" &&
    arguments[0].maxTime
      ? arguments[0].maxTime
      : undefined;

  const handleAdd = () => {
    if (activity.trim() === "" || !startTime) return;
    onAdd({
      name: activity,
      startTime,
      endTime,
      location,
      notes,
    });
    setActivity("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setNotes("");
  };

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex flex-wrap gap-2 w-full">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity name"
          className="min-w-[120px] flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="min-w-[140px] flex-1 px-3 py-2 border rounded-lg"
          placeholder="Start time"
          min={minTime}
          max={maxTime}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="min-w-[140px] flex-1 px-3 py-2 border rounded-lg"
          placeholder="End time"
          min={startTime || minTime}
          max={maxTime}
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="min-w-[120px] flex-1 px-3 py-2 border rounded-lg"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="min-w-[120px] flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
