// Validation utilities for trip creation and editing

export function validateTrip({
  name,
  startDate,
  endDate,
  cityStops,
  phoneNumber,
}) {
  const errors = [];

  // Trip name validation
  if (!name || name.trim().length === 0) {
    errors.push("Trip name is required");
  }

  // Phone number validation (Indian mobile numbers)
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    errors.push("Phone number is required");
  } else {
    const cleanPhone = phoneNumber.trim();

    // Check if it's exactly 10 digits
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      errors.push("Phone number must be exactly 10 digits");
    }
    // Check if it starts with valid Indian mobile prefixes (6, 7, 8, or 9)
    else if (!/^[6-9]/.test(cleanPhone)) {
      errors.push("Indian mobile numbers must start with 6, 7, 8, or 9");
    }
  }

  // Date validation
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

  if (!startDate) {
    errors.push("Start date is required");
  } else {
    const startDateObj = new Date(startDate);
    startDateObj.setHours(0, 0, 0, 0);
    if (startDateObj < today) {
      errors.push("Start date cannot be in the past");
    }
  }

  if (!endDate) {
    errors.push("End date is required");
  } else {
    const endDateObj = new Date(endDate);
    endDateObj.setHours(0, 0, 0, 0);
    if (endDateObj < today) {
      errors.push("End date cannot be in the past");
    }
  }

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    errors.push("End date must be after start date");
  }

  // City stops validation
  if (!cityStops || cityStops.length === 0) {
    errors.push("At least one city stop is required");
  } else {
    const validCityStops = cityStops.filter(
      (stop) => stop.city && stop.city.trim().length > 0
    );
    if (validCityStops.length === 0) {
      errors.push("At least one city stop with a valid city name is required");
    }

    // Validate city stop dates
    cityStops.forEach((stop, index) => {
      if (stop.city && stop.city.trim().length > 0) {
        // Check if arrival date is in the past
        if (stop.arrival) {
          const arrivalDateObj = new Date(stop.arrival);
          arrivalDateObj.setHours(0, 0, 0, 0);
          if (arrivalDateObj < today) {
            errors.push(
              `City stop ${index + 1}: Arrival date cannot be in the past`
            );
          }
        }

        // Check if departure date is in the past
        if (stop.departure) {
          const departureDateObj = new Date(stop.departure);
          departureDateObj.setHours(0, 0, 0, 0);
          if (departureDateObj < today) {
            errors.push(
              `City stop ${index + 1}: Departure date cannot be in the past`
            );
          }
        }

        if (
          stop.arrival &&
          stop.departure &&
          new Date(stop.arrival) > new Date(stop.departure)
        ) {
          errors.push(
            `City stop ${index + 1}: Departure date must be after arrival date`
          );
        }
        if (
          stop.arrival &&
          startDate &&
          new Date(stop.arrival) < new Date(startDate)
        ) {
          errors.push(
            `City stop ${
              index + 1
            }: Arrival date cannot be before trip start date`
          );
        }
        if (
          stop.departure &&
          endDate &&
          new Date(stop.departure) > new Date(endDate)
        ) {
          errors.push(
            `City stop ${
              index + 1
            }: Departure date cannot be after trip end date`
          );
        }
      }
    });
  }

  return errors;
}

export function validateActivity({
  name,
  startTime,
  endTime,
  cityArrival,
  cityDeparture,
}) {
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push("Activity name is required");
  }

  if (!startTime) {
    errors.push("Activity start time is required");
  }

  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    errors.push("End time must be after start time");
  }

  // Validate activity times are within city stop dates
  if (startTime && cityArrival) {
    const activityStart = new Date(startTime);
    const arrivalDate = new Date(cityArrival + "T00:00:00");
    if (activityStart < arrivalDate) {
      errors.push("Activity cannot start before city arrival date");
    }
  }

  if (startTime && cityDeparture) {
    const activityStart = new Date(startTime);
    const departureDate = new Date(cityDeparture + "T23:59:59");
    if (activityStart > departureDate) {
      errors.push("Activity cannot start after city departure date");
    }
  }

  if (endTime && cityArrival) {
    const activityEnd = new Date(endTime);
    const arrivalDate = new Date(cityArrival + "T00:00:00");
    if (activityEnd < arrivalDate) {
      errors.push("Activity cannot end before city arrival date");
    }
  }

  if (endTime && cityDeparture) {
    const activityEnd = new Date(endTime);
    const departureDate = new Date(cityDeparture + "T23:59:59");
    if (activityEnd > departureDate) {
      errors.push("Activity cannot end after city departure date");
    }
  }

  return errors;
}

export function validateCityStop({
  city,
  arrival,
  departure,
  tripStartDate,
  tripEndDate,
}) {
  const errors = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!city || city.trim().length === 0) {
    errors.push("City name is required");
  }

  // Check if arrival date is in the past
  if (arrival) {
    const arrivalDateObj = new Date(arrival);
    arrivalDateObj.setHours(0, 0, 0, 0);
    if (arrivalDateObj < today) {
      errors.push("Arrival date cannot be in the past");
    }
  }

  // Check if departure date is in the past
  if (departure) {
    const departureDateObj = new Date(departure);
    departureDateObj.setHours(0, 0, 0, 0);
    if (departureDateObj < today) {
      errors.push("Departure date cannot be in the past");
    }
  }

  if (arrival && departure && new Date(arrival) > new Date(departure)) {
    errors.push("Departure date must be after arrival date");
  }

  // Validate city stop dates are within trip dates
  if (arrival && tripStartDate && new Date(arrival) < new Date(tripStartDate)) {
    errors.push("Arrival date cannot be before trip start date");
  }

  if (arrival && tripEndDate && new Date(arrival) > new Date(tripEndDate)) {
    errors.push("Arrival date cannot be after trip end date");
  }

  if (
    departure &&
    tripStartDate &&
    new Date(departure) < new Date(tripStartDate)
  ) {
    errors.push("Departure date cannot be before trip start date");
  }

  if (departure && tripEndDate && new Date(departure) > new Date(tripEndDate)) {
    errors.push("Departure date cannot be after trip end date");
  }

  return errors;
}

// Helper function to get today's date in YYYY-MM-DD format
export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

// Helper function to validate if a date is not in the past
export function isDateNotInPast(dateString) {
  if (!dateString) return true;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date >= today;
}

// Helper function to validate datetime is within city stop bounds
export function isDateTimeWithinCityStop(
  dateTimeString,
  cityArrival,
  cityDeparture
) {
  if (!dateTimeString) return true;

  const dateTime = new Date(dateTimeString);

  if (cityArrival) {
    const arrivalStart = new Date(cityArrival + "T00:00:00");
    if (dateTime < arrivalStart) return false;
  }

  if (cityDeparture) {
    const departureEnd = new Date(cityDeparture + "T23:59:59");
    if (dateTime > departureEnd) return false;
  }

  return true;
}
