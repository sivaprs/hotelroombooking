import mongoose from "mongoose";

interface ILocation {
  name: string;
  _id: number;
}

const locationSchema = new mongoose.Schema<ILocation>({
  _id: { type: Number, required: true },
  name: { type: String, required: true }
});

const Location = mongoose.model<ILocation>("locations", locationSchema);
export default Location;