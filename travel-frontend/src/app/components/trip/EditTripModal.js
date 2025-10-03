"use client";
import EditCityStopForm from "../activity/EditCityStopForm";

export default function EditTripModal({
  editForm,
  setEditForm,
  onClose,
  onSubmit,
  editErrors,
  removeCityStop,
  addCityStop,
  removeActivity,
  addActivity,
  setEditFormField,
  loading,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh] text-black border border-gray-300 flex flex-col"
        style={{ boxSizing: "border-box" }}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          title="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Edit Trip</h2>
        {editErrors && editErrors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-2">
            <ul className="list-disc ml-5">
              {editErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Trip Details */}
        <input
          className="w-full border px-3 py-2 rounded-lg mb-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Trip Name"
          value={editForm.name}
          onChange={(e) => setEditFormField("name", e.target.value)}
          required
        />
        <textarea
          className="w-full border px-3 py-2 min-h-10 rounded-lg mb-2 text-black resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Trip Description"
          value={editForm.description}
          onChange={(e) => setEditFormField("description", e.target.value)}
        />
        <div className="flex gap-4 mb-2 flex-wrap">
          <input
            type="date"
            className="flex-1 border px-3 py-2 rounded-lg text-black"
            value={editForm.startDate}
            onChange={(e) => setEditFormField("startDate", e.target.value)}
            required
            max={editForm.endDate || undefined}
          />
          <input
            type="date"
            className="flex-1 border px-3 py-2 rounded-lg text-black"
            value={editForm.endDate}
            onChange={(e) => setEditFormField("endDate", e.target.value)}
            required
            min={editForm.startDate || undefined}
          />
        </div>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <label className="font-medium text-black">Public Trip?</label>
          <input
            type="checkbox"
            checked={editForm.isPublic}
            onChange={(e) => setEditFormField("isPublic", e.target.checked)}
          />
          <span className="text-xs text-gray-500">
            (If unchecked, trip is private)
          </span>
        </div>

        {/* City Stops */}
        <EditCityStopForm
          cityStops={editForm.cityStops}
          setEditForm={setEditForm}
          removeCityStop={removeCityStop}
          addCityStop={addCityStop}
          removeActivity={removeActivity}
          addActivity={addActivity}
          tripStart={editForm.startDate}
          tripEnd={editForm.endDate}
        />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
