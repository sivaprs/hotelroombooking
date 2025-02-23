import { Request, Response } from "express";
import Location from "../models/location.model";
import logger from "../utils/logger";

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error: any) {
    logger.error("Location fetch failed", error.message);
    res.status(500).json({ error: error.message });
  }
};
