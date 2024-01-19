import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";

const babySchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  nickname: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true, unique: true, sparse: true },
  followBabyCode: { type: String }
});

export type Baby = InferSchemaType<typeof babySchema>;

export const BabyModel = model("Baby", babySchema);
