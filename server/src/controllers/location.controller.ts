import { Request, Response } from "express";
import Location from "../models/location.model";
import logger from "../utils/logger";

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error: unknown) {
    logger.error(
      "Location fetch failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
