"use client";
import CityStopForm from "./CityStopForm";

export default function TripForm({
  name,
  setName,
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  phoneNumber,
  setPhoneNumber,
  isPublic,
  setIsPublic,
  cityStops,
  setCityStops,
  errors,
  handleSubmit,
  addCityStop,
  addActivity,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border px-3 py-2 rounded-lg"
        placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full border px-3 py-2 rounded-lg"
        placeholder="Trip Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded-lg"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        type="tel"
        pattern="[0-9]{10}"
        maxLength={10}
      />
      <div className="flex gap-4">
        <input
          type="date"
          className="flex-1 border px-3 py-2 rounded-lg"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (endDate && e.target.value && endDate < e.target.value) {
              setEndDate("");
            }
          }}
          required
          max={endDate || undefined}
        />
        <input
          type="date"
          className="flex-1 border px-3 py-2 rounded-lg"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          min={startDate || undefined}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="font-medium">Public Trip?</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <span className="text-xs text-gray-500">(If unchecked, trip is private)</span>
      </div>
      <CityStopForm
        cityStops={cityStops}
        setCityStops={setCityStops}
        startDate={startDate}
        endDate={endDate}
        addActivity={addActivity}
        addCityStop={addCityStop}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Create Trip
      </button>
    </form>
  );
}
