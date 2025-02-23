import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import Location from "../models/location.model";
import logger from "../utils/logger";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "locations", // Collection name in MongoDB
          localField: "location",
          foreignField: "_id",
          as: "locationDetails",
        },
      },
      {
        $unwind: "$locationDetails", // Convert array to object
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          rating: 1,
          locationName: "$locationDetails.name", // Rename the field
        },
      },
    ]);
    res.json(hotels);
  } catch (error: any) {
    logger.error("hotel fetch failed", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getHotelsByLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const filter = id ? { location: Number(id) } : {};
    const hotels: any = await Hotel.find(filter);
    const locations: any = await Location.findOne({ _id: id });

    res.json({ hotels, locationName: locations.name });
  } catch (error: unknown) {
    logger.error(
      "hotel fetch by location failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
