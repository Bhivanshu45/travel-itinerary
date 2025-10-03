"use client";
import { useState } from "react";
import Navbar from "../../../../travel-frontend/src/app/components/common/Navbar";
import TripForm from "./TripForm";
import { validateTrip } from "../utils/validationUtils";

export default function CreateTripPage() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [cityStops, setCityStops] = useState([
    {
      city: "",
      arrival: "",
      departure: "",
      transport: "",
      activities: [],
    },
  ]);

  const addActivity = (activityObj, cityIdx) => {
    setCityStops((prev) =>
      prev.map((c, idx) =>
        idx === cityIdx
          ? {
              ...c,
              activities: [
                ...c.activities,
                {
                  name: activityObj.name,
                  startTime: activityObj.startTime,
                  endTime: activityObj.endTime,
                  location: activityObj.location || "",
                  notes: activityObj.notes || "",
                },
              ],
            }
          : c
      )
    );
  };

  const addCityStop = () => {
    setCityStops([
      ...cityStops,
      {
        city: "",
        arrival: "",
        departure: "",
        transport: "",
        activities: [],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTrip({
      name,
      startDate,
      endDate,
      cityStops,
      phoneNumber,
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    const filteredCityStops = cityStops
      .filter((c) => c.city.trim() !== "")
      .map((c) => ({
        ...c,
        arrival: c.arrival || null,
        departure: c.departure || null,
        transport: c.transport || null,
        activities: c.activities.map((a) => ({
          name: a.name,
          startTime: a.startTime || null,
          endTime: a.endTime || null,
          location: a.location || null,
          notes: a.notes || null,
        })),
      }));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trips`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          startDate,
          endDate,
          phoneNumber,
          isPublic,
          cityStops: filteredCityStops,
        }),
      }
    );
    if (res.ok) {
      alert("Trip created!");
      window.location.href = "/";
    } else {
      alert("Failed to create trip");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white text-black mt-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Trip</h1>
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-2">
            <ul className="list-disc ml-5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <TripForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          cityStops={cityStops}
          setCityStops={setCityStops}
          errors={errors}
          handleSubmit={handleSubmit}
          addCityStop={addCityStop}
          addActivity={addActivity}
        />
      </div>
    </div>
  );
}
