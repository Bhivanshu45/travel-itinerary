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

  // Phone number validation
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    errors.push("Phone number is required");
  } else if (!/^[0-9]{10}$/.test(phoneNumber.trim())) {
    errors.push("Phone number must be exactly 10 digits");
  }

  // Date validation
  if (!startDate) {
    errors.push("Start date is required");
  }
  if (!endDate) {
    errors.push("End date is required");
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

export function validateActivity({ name, startTime, endTime }) {
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push("Activity name is required");
  }

  if (startTime && endTime && new Date(startTime) > new Date(endTime)) {
    errors.push("End time must be after start time");
  }

  return errors;
}

export function validateCityStop({ city, arrival, departure }) {
  const errors = [];

  if (!city || city.trim().length === 0) {
    errors.push("City name is required");
  }

  if (arrival && departure && new Date(arrival) > new Date(departure)) {
    errors.push("Departure date must be after arrival date");
  }

  return errors;
}
