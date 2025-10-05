"use client";
import { useState } from "react";

export default function ActivityInput({ onAdd, minTime, maxTime }) {
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    // Basic validation
    if (activity.trim() === "") {
      alert("Activity name is required");
      return;
    }
    if (!startTime) {
      alert("Start time is required");
      return;
    }

    // Validate time constraints
    if (endTime && new Date(startTime) >= new Date(endTime)) {
      alert("End time must be after start time");
      return;
    }

    // Validate against city stop date boundaries
    if (minTime && startTime < minTime) {
      alert("Activity start time cannot be before city arrival time");
      return;
    }
    if (maxTime && startTime > maxTime) {
      alert("Activity start time cannot be after city departure time");
      return;
    }
    if (endTime && minTime && endTime < minTime) {
      alert("Activity end time cannot be before city arrival time");
      return;
    }
    if (endTime && maxTime && endTime > maxTime) {
      alert("Activity end time cannot be after city departure time");
      return;
    }

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
          suppressHydrationWarning
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => {
            const newStartTime = e.target.value;
            setStartTime(newStartTime);

            // Clear end time if it becomes invalid
            if (
              endTime &&
              newStartTime &&
              new Date(endTime) <= new Date(newStartTime)
            ) {
              setEndTime("");
            }
          }}
          onBlur={(e) => {
            const dateTimeValue = e.target.value;

            // PROFESSIONAL VALIDATION: Only validate when user finishes input (onBlur)
            if (
              dateTimeValue &&
              dateTimeValue.length === 16 &&
              dateTimeValue.includes("T")
            ) {
              const selectedDateTime = new Date(dateTimeValue);
              const now = new Date();

              // Check if datetime is valid and in the past
              if (
                !isNaN(selectedDateTime.getTime()) &&
                selectedDateTime < now
              ) {
                alert(
                  "❌ Activity start time cannot be in the past! Please select a current or future date and time."
                );
                setStartTime("");
                e.target.focus();
                return;
              }

              // Validate against city stop boundaries
              if (minTime && dateTimeValue < minTime) {
                alert(" Start time cannot be before city arrival time");
                setStartTime("");
                e.target.focus();
                return;
              }
              if (maxTime && dateTimeValue > maxTime) {
                alert("Start time cannot be after city departure time");
                setStartTime("");
                e.target.focus();
              }
            }
          }}
          className="min-w-[140px] flex-1 px-3 py-2 border rounded-lg"
          placeholder="Start time"
          min={minTime}
          max={maxTime}
          suppressHydrationWarning
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => {
            const newEndTime = e.target.value;
            setEndTime(newEndTime);
          }}
          onBlur={(e) => {
            const dateTimeValue = e.target.value;

            // PROFESSIONAL VALIDATION: Only validate when user finishes input (onBlur)
            if (
              dateTimeValue &&
              dateTimeValue.length === 16 &&
              dateTimeValue.includes("T")
            ) {
              const selectedDateTime = new Date(dateTimeValue);
              const now = new Date();

              // Check if datetime is valid and in the past
              if (
                !isNaN(selectedDateTime.getTime()) &&
                selectedDateTime < now
              ) {
                alert(
                  "❌ Activity end time cannot be in the past! Please select a current or future date and time."
                );
                setEndTime("");
                e.target.focus();
                return;
              }

              // Validate against start time and city stop boundaries
              if (
                startTime &&
                dateTimeValue &&
                new Date(dateTimeValue) <= new Date(startTime)
              ) {
                alert("❌ End time must be after start time");
                setEndTime("");
                e.target.focus();
                return;
              }
              if (minTime && dateTimeValue < minTime) {
                alert("❌ End time cannot be before city arrival time");
                setEndTime("");
                e.target.focus();
                return;
              }
              if (maxTime && dateTimeValue > maxTime) {
                alert("❌ End time cannot be after city departure time");
                setEndTime("");
                e.target.focus();
              }
            }
          }}
          className="min-w-[140px] flex-1 px-3 py-2 border rounded-lg"
          placeholder="End time"
          min={startTime || minTime}
          max={maxTime}
          suppressHydrationWarning
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="min-w-[120px] flex-1 px-3 py-2 border rounded-lg"
          suppressHydrationWarning
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="min-w-[120px] flex-1 px-3 py-2 border rounded-lg"
          suppressHydrationWarning
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          suppressHydrationWarning
        >
          Add
        </button>
      </div>
    </div>
  );
}
