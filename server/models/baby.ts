// server/src/models/baby.ts
import mongoose, { Schema } from "mongoose";

export interface IBaby {
  _id: string;
  babyName?: string;
  dueDate: Date;
}

const BabySchema = new Schema<IBaby>({
  _id: { type: String, required: false },
  babyName: { type: String, required: false },
  dueDate: { type: Date, required: true },
});

const BabyModel = mongoose.model<IBaby>("Baby", BabySchema);

export default BabyModel;
