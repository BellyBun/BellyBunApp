import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";

const babySchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  nickname: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

export type Baby = InferSchemaType<typeof babySchema>;

export const BabyModel = model("Baby", babySchema);
