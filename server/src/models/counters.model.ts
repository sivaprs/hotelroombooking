import mongoose from "mongoose";

interface ICounters {
  _id: string;
  seq: number;
}

const countersSchema = new mongoose.Schema<ICounters>({
  _id: { type: String, required: true },
  seq: { type: Number, required: true }
});

const Counters = mongoose.model<ICounters>("counters", countersSchema);
export default Counters;