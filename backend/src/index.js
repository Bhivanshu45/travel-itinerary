import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/trips", tripRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Travel Itinerary API running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
