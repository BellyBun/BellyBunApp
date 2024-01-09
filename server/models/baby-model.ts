import { SchemaTypes, Schema, InferSchemaType, model } from "mongoose";

const BabySchema = new Schema({
  babyName: { type: String, required: false },
  dueDate: { type: Date, required: true },
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

export type Baby = InferSchemaType<typeof BabySchema>;

export const BabyModel = model("Baby", BabySchema);
