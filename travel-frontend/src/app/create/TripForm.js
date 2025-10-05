"use client";
import CityStopForm from "./CityStopForm";

import { useState } from "react";

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
  const [phoneError, setPhoneError] = useState("");
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      suppressHydrationWarning
    >
      <input
        className="w-full border px-3 py-2 rounded-lg"
        placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        suppressHydrationWarning
      />
      <textarea
        className="w-full border px-3 py-2 rounded-lg"
        placeholder="Trip Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        suppressHydrationWarning
      />
      <div className="w-full">
        <input
          className={`w-full border px-3 py-2 rounded-lg ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
          placeholder="Phone Number (10 digits, starting with 6/7/8/9)"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value;

            // Only allow digits and limit to 10 characters
            const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
            setPhoneNumber(digitsOnly);
          }}
          onBlur={(e) => {
            const phoneValue = e.target.value;
            setPhoneError(""); // Clear previous error

            // PROFESSIONAL VALIDATION: Validate Indian phone number format
            if (phoneValue) {
              // Check if it's exactly 10 digits
              if (phoneValue.length !== 10) {
                setPhoneError("Phone number must be exactly 10 digits");
                return;
              }

              // Check if it starts with valid Indian mobile prefixes (6, 7, 8, or 9)
              if (!/^[6-9]/.test(phoneValue)) {
                setPhoneError(
                  "Indian mobile numbers must start with 6, 7, 8, or 9"
                );
                return;
              }

              // Check if all characters are digits
              if (!/^[0-9]{10}$/.test(phoneValue)) {
                setPhoneError("Phone number must contain only digits");
                return;
              }
            }
          }}
          onFocus={() => setPhoneError("")} // Clear error when user starts typing
          required
          type="tel"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
          suppressHydrationWarning
        />
        {(phoneError || errors.phoneNumber) && (
          <p className="text-red-500 text-sm mt-1">
            {phoneError || errors.phoneNumber}
          </p>
        )}
        {!phoneError && !errors.phoneNumber && (
          <p className="text-gray-500 text-xs mt-1">
            ℹ️ Indian mobile numbers only (10 digits starting with 6, 7, 8, or
            9)
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="date"
            className={`w-full border px-3 py-2 rounded-lg ${
              errors.startDate ? "border-red-500" : ""
            }`}
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => {
              const newStartDate = e.target.value;
              setStartDate(newStartDate);

              // Clear end date if it becomes invalid
              if (
                endDate &&
                newStartDate &&
                new Date(endDate) < new Date(newStartDate)
              ) {
                setEndDate("");
              }

              // Clear city stop dates that become invalid
              setCityStops((prevStops) =>
                prevStops.map((stop) => {
                  const updatedStop = { ...stop };
                  if (
                    stop.arrival &&
                    new Date(stop.arrival) < new Date(newStartDate)
                  ) {
                    updatedStop.arrival = "";
                  }
                  if (
                    stop.departure &&
                    new Date(stop.departure) < new Date(newStartDate)
                  ) {
                    updatedStop.departure = "";
                  }
                  return updatedStop;
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
                if (!isNaN(selectedDate.getTime()) && selectedDate < today) {
                  alert(
                    "❌ Trip start date cannot be in the past! Please select today's date or a future date."
                  );
                  // Clear the invalid date
                  setStartDate("");
                  e.target.focus(); // Return focus to let user correct
                }
              }
            }}
            required
            min={new Date().toISOString().split("T")[0]}
            max={endDate || undefined}
            suppressHydrationWarning
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="date"
            className={`w-full border px-3 py-2 rounded-lg ${
              errors.endDate ? "border-red-500" : ""
            }`}
            placeholder="End Date"
            value={endDate}
            onChange={(e) => {
              const newEndDate = e.target.value;
              setEndDate(newEndDate);

              // Clear city stop dates that become invalid
              setCityStops((prevStops) =>
                prevStops.map((stop) => {
                  const updatedStop = { ...stop };
                  if (
                    stop.arrival &&
                    new Date(stop.arrival) > new Date(newEndDate)
                  ) {
                    updatedStop.arrival = "";
                  }
                  if (
                    stop.departure &&
                    new Date(stop.departure) > new Date(newEndDate)
                  ) {
                    updatedStop.departure = "";
                  }
                  return updatedStop;
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
                if (!isNaN(selectedDate.getTime()) && selectedDate < today) {
                  alert(
                    "❌ Trip end date cannot be in the past! Please select today's date or a future date."
                  );
                  setEndDate("");
                  e.target.focus();
                  return;
                }

                // Check if end date is before start date
                if (
                  startDate &&
                  startDate.length === 10 &&
                  new Date(dateValue) < new Date(startDate)
                ) {
                  alert(
                    "❌ Trip end date cannot be before the start date! Please select a date after the start date."
                  );
                  setEndDate("");
                  e.target.focus();
                }
              }
            }}
            required
            min={startDate || new Date().toISOString().split("T")[0]}
            suppressHydrationWarning
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="font-medium">Public Trip?</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <span className="text-xs text-gray-500">
          (If unchecked, trip is private)
        </span>
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
        suppressHydrationWarning
      >
        Create Trip
      </button>
    </form>
  );
}
