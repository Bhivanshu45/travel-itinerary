import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  getPublicTrips,
  getTripsByPhone,
  getTripByShareId,
} from "../controllers/tripController.js";

const router = express.Router();

// Create trip
router.post("/", createTrip);

// Get all trips (legacy, not used for public/private separation)
router.get("/", getTrips);

// Get all public trips
router.get("/public", getPublicTrips);

// Get trips by phone number
router.get("/user", getTripsByPhone);

// Get trip by shareId (sharable link)
router.get("/share/:shareId", getTripByShareId);

// Get trip by id
router.get("/:id", getTripById);

export default router;
