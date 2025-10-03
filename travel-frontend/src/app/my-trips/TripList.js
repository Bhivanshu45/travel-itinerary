import TripCard from "../../../../travel-frontend/src/app/components/trip/TripCard";

export default function TripList({
  trips,
  loading,
  submitted,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (submitted && trips.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trips found for this number.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          showActions={true}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
