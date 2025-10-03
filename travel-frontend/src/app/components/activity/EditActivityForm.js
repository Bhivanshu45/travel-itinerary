"use client";

export default function EditActivityForm({
  activities,
  cityIdx,
  removeActivity,
  addActivity,
  setEditForm,
  arrival,
  departure,
}) {
  const handleActivityChange = (actIdx, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      cityStops: prev.cityStops.map((c, i) =>
        i === cityIdx
          ? {
              ...c,
              activities: c.activities.map((a, j) =>
                j === actIdx ? { ...a, [field]: value } : a
              ),
            }
          : c
      ),
    }));
  };

  const handleAddActivity = () => {
    const newActivity = {
      name: "",
      startTime: "",
      endTime: "",
      location: "",
      notes: "",
    };
    addActivity(cityIdx, newActivity);
  };

  return (
    <div className="mt-2">
      <label className="font-medium mb-2 block text-sm">Activities</label>
      {activities.map((activity, actIdx) => (
        <div key={actIdx} className="border rounded-lg p-3 mb-3 bg-white">
          <div className="flex justify-between items-start mb-2">
            <input
              className="flex-1 border px-2 py-1 rounded text-sm"
              placeholder="Activity Name"
              value={activity.name || ""}
              onChange={(e) =>
                handleActivityChange(actIdx, "name", e.target.value)
              }
              required
            />
            <button
              type="button"
              className="ml-2 text-red-500 text-xs border px-2 py-1 rounded hover:bg-red-100"
              onClick={() => removeActivity(cityIdx, actIdx)}
            >
              Remove
            </button>
          </div>

          <div className="flex gap-2 mb-2 flex-wrap">
            <input
              type="datetime-local"
              className="flex-1 border px-2 py-1 rounded text-sm"
              value={activity.startTime || ""}
              onChange={(e) =>
                handleActivityChange(actIdx, "startTime", e.target.value)
              }
              min={arrival ? arrival + "T00:00" : undefined}
              max={departure ? departure + "T23:59" : undefined}
              placeholder="Start Time"
            />
            <input
              type="datetime-local"
              className="flex-1 border px-2 py-1 rounded text-sm"
              value={activity.endTime || ""}
              onChange={(e) =>
                handleActivityChange(actIdx, "endTime", e.target.value)
              }
              min={
                activity.startTime || (arrival ? arrival + "T00:00" : undefined)
              }
              max={departure ? departure + "T23:59" : undefined}
              placeholder="End Time"
            />
          </div>

          <input
            className="w-full border px-2 py-1 rounded text-sm mb-2"
            placeholder="Location (optional)"
            value={activity.location || ""}
            onChange={(e) =>
              handleActivityChange(actIdx, "location", e.target.value)
            }
          />

          <textarea
            className="w-full border px-2 py-1 rounded text-sm resize-vertical"
            placeholder="Notes (optional)"
            value={activity.notes || ""}
            onChange={(e) =>
              handleActivityChange(actIdx, "notes", e.target.value)
            }
            rows="2"
          />
        </div>
      ))}

      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
        onClick={handleAddActivity}
      >
        Add Activity
      </button>
    </div>
  );
}
