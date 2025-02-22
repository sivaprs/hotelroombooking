import express from "express";
import { getHotels, getHotelsByLocation } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/", getHotels);

router.get("/location/:id", getHotelsByLocation);

export default router;