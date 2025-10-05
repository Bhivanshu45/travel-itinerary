import { useState } from "react";

export default function TripSearchForm({ phone, setPhone, handleSubmit }) {
  const [phoneError, setPhoneError] = useState("");

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-center">
      <div className="flex-1">
        <input
          type="tel"
          pattern="[6-9][0-9]{9}"
          className={`w-full border px-3 py-2 rounded-lg ${
            phoneError ? "border-red-500" : ""
          }`}
          placeholder="Enter your 10-digit phone number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;

            // Only allow digits and limit to 10 characters
            const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
            setPhone(digitsOnly);
          }}
          onBlur={(e) => {
            const phoneValue = e.target.value;
            setPhoneError(""); // Clear previous error

            if (phoneValue && phoneValue.length > 0) {
              // Check if it's exactly 10 digits
              if (phoneValue.length !== 10) {
                setPhoneError("Phone number must be exactly 10 digits");
                return;
              }

              // Check if it starts with valid Indian mobile prefixes
              if (!/^[6-9]/.test(phoneValue)) {
                setPhoneError(
                  "Indian mobile numbers must start with 6, 7, 8, or 9"
                );
                return;
              }
            }
          }}
          onFocus={() => setPhoneError("")} // Clear error when user starts typing
          inputMode="numeric"
          title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
          required
        />
        {phoneError ? (
          <p className="text-red-500 text-xs mt-1">❌ {phoneError}</p>
        ) : (
          <p className="text-gray-500 text-xs mt-1">
            ℹ️ Enter Indian mobile number (starts with 6, 7, 8, or 9)
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Show My Trips
      </button>
    </form>
  );
}
