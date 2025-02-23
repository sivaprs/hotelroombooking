import { Request, Response } from "express";
import Location from "../models/location.model";

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
