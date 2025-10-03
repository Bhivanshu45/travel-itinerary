import prisma from "../config/db.js";

// -------------------- Trip Creation --------------------
export const createTrip = async (req, res) => {
  try {
    const { name, startDate, endDate, cityStops, phoneNumber, isPublic } =
      req.body;
    // Validation
    if (!name || !startDate || !endDate || !cityStops?.length || !phoneNumber) {
      return res
        .status(400)
        .json({
          error: "Trip name, dates, city stops, and phone number are required.",
        });
    }
    if (new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date." });
    }
    // Create trip
    const trip = await prisma.trip.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        phoneNumber,
        isPublic: typeof isPublic === "boolean" ? isPublic : true,
        cityStops: {
          create: cityStops.map((c) => ({
            city: c.city,
            arrival: c.arrival ? new Date(c.arrival) : null,
            departure: c.departure ? new Date(c.departure) : null,
            transport: c.transport || null,
            activities: {
              create:
                c.activities?.map((a) => ({
                  name: a.name,
                  startTime: new Date(a.startTime),
                  endTime: new Date(a.endTime),
                  location: a.location || null,
                  notes: a.notes || null,
                })) || [],
            },
          })),
        },
      },
      include: {
        cityStops: { include: { activities: true } },
      },
    });
    res.status(201).json(trip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip." });
  }
};

// -------------------- Trip Retrieval --------------------
export const getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: { cityStops: { include: { activities: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trips." });
  }
};

// Get a single trip by ID
export const getTripById = async (req, res) => {
  try {
    const tripId = parseInt(req.params.id);
    if (isNaN(tripId)) {
      return res.status(400).json({ error: "Invalid trip ID." });
    }
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { cityStops: { include: { activities: true } } },
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trip." });
  }
};

// Get all public trips
export const getPublicTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { isPublic: true },
      include: { cityStops: { include: { activities: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch public trips." });
  }
};

// Get trips by phone number
export const getTripsByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required." });
    }
    const trips = await prisma.trip.findMany({
      where: { phoneNumber: phone },
      include: { cityStops: { include: { activities: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user's trips." });
  }
};

// Get trip by shareId (for sharable link)
export const getTripByShareId = async (req, res) => {
  try {
    const { shareId } = req.params;
    if (!shareId) {
      return res.status(400).json({ error: "Share ID is required." });
    }
    const trip = await prisma.trip.findUnique({
      where: { shareId },
      include: { cityStops: { include: { activities: true } } },
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trip by shareId." });
  }
};


