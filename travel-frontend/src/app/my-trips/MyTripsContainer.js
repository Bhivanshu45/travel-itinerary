"use client";
import { useState } from "react";
import Navbar from "../../../../travel-frontend/src/app/components/common/Navbar";
import TripList from "./TripList";
import EditTripModal from "../components/trip/EditTripModal";
import TripSearchForm from "./TripSearchForm";
import { safeDateFormat, safeToISOString } from "../utils/validationUtils";

export default function MyTripsContainer() {
  const [phone, setPhone] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  const handleDelete = async (trip) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the trip "${trip.name}"? This cannot be undone.`
      )
    )
      return;
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/${trip.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      }
    );
    if (res.ok) {
      setTrips((prev) => prev.filter((t) => t.id !== trip.id));
    } else {
      alert("Failed to delete trip.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/user?phone=${phone}`
    );
    const data = await res.json();
    setTrips(data);
    setLoading(false);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setEditForm({
      name: trip.name,
      description: trip.description || "",
      startDate: safeDateFormat(trip.startDate, "date"),
      endDate: safeDateFormat(trip.endDate, "date"),
      phoneNumber: phone,
      isPublic: trip.isPublic,
      cityStops: trip.cityStops.map((c) => ({
        city: c.city,
        arrival: safeDateFormat(c.arrival, "date"),
        departure: safeDateFormat(c.departure, "date"),
        transport: c.transport || "",
        activities: c.activities.map((a) => ({
          name: a.name,
          startTime: safeDateFormat(a.startTime, "datetime"),
          endTime: safeDateFormat(a.endTime, "datetime"),
          location: a.location || "",
          notes: a.notes || "",
        })),
      })),
    });
    setEditErrors([]);
  };

  const setEditFormField = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const removeCityStop = (idx) => {
    setEditForm((prev) => ({
      ...prev,
      cityStops: prev.cityStops.filter((_, i) => i !== idx),
    }));
  };

  const removeActivity = (cityIdx, actIdx) => {
    setEditForm((prev) => ({
      ...prev,
      cityStops: prev.cityStops.map((c, i) =>
        i === cityIdx
          ? { ...c, activities: c.activities.filter((_, j) => j !== actIdx) }
          : c
      ),
    }));
  };

  const addCityStop = () => {
    setEditForm((prev) => ({
      ...prev,
      cityStops: [
        ...prev.cityStops,
        {
          city: "",
          arrival: "",
          departure: "",
          transport: "",
          activities: [],
        },
      ],
    }));
  };

  const addActivity = (cityIdx, activityObj) => {
    setEditForm((prev) => ({
      ...prev,
      cityStops: prev.cityStops.map((c, i) =>
        i === cityIdx ? { ...c, activities: [...c.activities, activityObj] } : c
      ),
    }));
  };

  const handleEditSubmit = async () => {
    setEditLoading(true);
    const preparedForm = {
      ...editForm,
      cityStops: editForm.cityStops.map((c) => ({
        city: c.city,
        arrival: safeToISOString(c.arrival),
        departure: safeToISOString(c.departure),
        transport: c.transport || null,
        activities: c.activities.map((a) => ({
          name: a.name,
          startTime: safeToISOString(a.startTime),
          endTime: safeToISOString(a.endTime),
          location: a.location || null,
          notes: a.notes || null,
        })),
      })),
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips/${editingTrip.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedForm),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setTrips((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingTrip(null);
      setEditForm(null);
    } else {
      setEditErrors(["Failed to update trip."]);
    }
    setEditLoading(false);
  };

  const handleEditCancel = () => {
    setEditingTrip(null);
    setEditForm(null);
    setEditErrors([]);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">My Trips</h1>
        <TripSearchForm
          phone={phone}
          setPhone={setPhone}
          handleSubmit={handleSubmit}
        />
        <TripList
          trips={trips}
          loading={loading}
          submitted={submitted}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {editingTrip && editForm && (
          <EditTripModal
            editForm={editForm}
            setEditForm={setEditForm}
            onClose={handleEditCancel}
            onSubmit={handleEditSubmit}
            editErrors={editErrors}
            removeCityStop={removeCityStop}
            addCityStop={addCityStop}
            removeActivity={removeActivity}
            addActivity={addActivity}
            setEditFormField={setEditFormField}
            loading={editLoading}
          />
        )}
      </div>
    </div>
  );
}
