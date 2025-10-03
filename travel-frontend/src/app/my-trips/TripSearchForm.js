export default function TripSearchForm({ phone, setPhone, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-center">
      <input
        type="tel"
        pattern="[0-9]{10}"
        maxLength={10}
        className="border px-3 py-2 rounded-lg flex-1"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Show My Trips
      </button>
    </form>
  );
}
