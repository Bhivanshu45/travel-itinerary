"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getWeatherForCityDate } from "../../utils/weather";

function groupActivitiesByDay(cityStops) {
  const days = {};
  cityStops.forEach((stop) => {
    stop.activities.forEach((a) => {
      if (!a.startTime) return;
      const day = new Date(a.startTime).toLocaleDateString();
      if (!days[day]) days[day] = [];
      days[day].push({ ...a, city: stop.city });
    });
  });
  return days;
}

export default function ItineraryTimeline({ cityStops }) {
  const days = groupActivitiesByDay(cityStops);
  const dayKeys = Object.keys(days).sort((a, b) => new Date(a) - new Date(b));
  const [expandedDays, setExpandedDays] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [weatherLoading, setWeatherLoading] = useState({});
  const [weatherError, setWeatherError] = useState({});

  useEffect(() => {
    const dayKeysString = dayKeys.join(",");
    dayKeys.forEach((day) => {
      // Get the first city for the day
      const firstActivity = days[day][0];
      const city = firstActivity.city;
      // Only fetch if not already fetched
      if (!weatherData[day] && city) {
        setWeatherLoading((prev) => ({ ...prev, [day]: true }));
        getWeatherForCityDate(city, new Date(day).toISOString().slice(0, 10))
          .then((data) => {
            setWeatherData((prev) => ({ ...prev, [day]: data }));
            setWeatherLoading((prev) => ({ ...prev, [day]: false }));
            setWeatherError((prev) => ({ ...prev, [day]: !data }));
          })
          .catch(() => {
            setWeatherData((prev) => ({ ...prev, [day]: null }));
            setWeatherLoading((prev) => ({ ...prev, [day]: false }));
            setWeatherError((prev) => ({ ...prev, [day]: true }));
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayKeysString, cityStops]);

  function handleExpand(day) {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-6">
      {dayKeys.length === 0 && (
        <div className="text-gray-400">No activities scheduled.</div>
      )}
      {dayKeys.map((day, idx) => (
        <div key={day} className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-4 top-0 h-full w-0.5 bg-blue-200"
            style={{ zIndex: 0 }}
          />
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleExpand(day)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold shadow-lg border-2 border-blue-300 transition-all duration-200 ${
                expandedDays.includes(day) ? "scale-110" : "scale-100"
              }`}
              style={{ zIndex: 1 }}
            >
              {idx + 1}
            </div>
            <div className="font-semibold text-lg text-blue-700">
              Day {idx + 1}{" "}
              <span className="text-xs text-gray-500 ml-2">{day}</span>
            </div>
            {/* Weather display */}
            <div className="ml-4">
              {weatherLoading[day] ? (
                <span className="text-xs text-gray-400">
                  Loading weather...
                </span>
              ) : weatherError[day] ? (
                <span className="text-xs text-red-400">
                  Weather unavailable
                </span>
              ) : weatherData[day] ? (
                <span className="flex items-center gap-1 text-xs text-blue-700">
                  <img
                    src={weatherData[day].icon}
                    alt="weather"
                    className="w-6 h-6 inline-block"
                  />
                  {Math.round(weatherData[day].temp)}°C,{" "}
                  {weatherData[day].description}
                </span>
              ) : null}
            </div>
          </div>
          {expandedDays.includes(day) && (
            <div className="ml-12 mt-4 flex flex-col gap-4">
              {days[day].map((a, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-4 border border-blue-100"
                >
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="font-bold text-blue-700 text-base">
                      {a.name}
                    </span>
                    <span className="text-xs text-gray-400">{a.city}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    {a.startTime && (
                      <span>
                        {new Date(a.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                    {a.endTime && (
                      <span>
                        {" "}
                        -{" "}
                        {new Date(a.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                    {a.location && (
                      <span className="ml-2 text-gray-400">@ {a.location}</span>
                    )}
                  </div>
                  {a.notes && (
                    <div className="text-xs text-gray-500">
                      Notes: {a.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
