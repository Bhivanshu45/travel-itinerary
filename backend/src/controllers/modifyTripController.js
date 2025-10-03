import prisma from "../config/db.js";

// -------------------- Trip Update --------------------
export const updateTrip = async (req, res) => {
  try {
    const tripId = parseInt(req.params.id);
    const { phoneNumber, name, startDate, endDate, cityStops, isPublic } =
      req.body;
    if (isNaN(tripId)) {
      return res.status(400).json({ error: "Invalid trip ID." });
    }
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number required." });
    }
    // Find trip and verify ownership
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    if (trip.phoneNumber !== phoneNumber) {
      return res
        .status(403)
        .json({ error: "Unauthorized: phone number does not match." });
    }
    // Delete existing city stops and activities (cascade)
    await prisma.cityStop.deleteMany({ where: { tripId } });
    // Update trip fields and recreate city stops/activities
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isPublic: typeof isPublic === "boolean" ? isPublic : trip.isPublic,
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
      include: { cityStops: { include: { activities: true } } },
    });
    res.json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({ error: "Failed to update trip." });
  }
};

// -------------------- Trip Deletion --------------------
export const deleteTrip = async (req, res) => {
  try {
    const tripId = parseInt(req.params.id);
    const { phoneNumber } = req.body;
    if (isNaN(tripId)) {
      return res.status(400).json({ error: "Invalid trip ID." });
    }
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number required." });
    }
    // Find trip and verify ownership
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    if (trip.phoneNumber !== phoneNumber) {
      return res
        .status(403)
        .json({ error: "Unauthorized: phone number does not match." });
    }
    // Delete trip (cascade deletes city stops/activities)
    await prisma.trip.delete({ where: { id: tripId } });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Failed to delete trip." });
  }
};

// lloks