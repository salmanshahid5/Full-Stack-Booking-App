import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE: Only admins should be allowed to create hotels
router.post("/", verifyAdmin, createHotel);

// UPDATE: Only admins should be allowed to update hotel information
router.put("/:id", verifyAdmin, updateHotel);

// DELETE: Only admins should be allowed to delete hotels
router.delete("/:id", verifyAdmin, deleteHotel);

// GET: Public access to retrieve a single hotel by ID
router.get("/find/:id", getHotel);

// GET ALL: Public access to retrieve all hotels
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
