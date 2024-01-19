import bcrypt from "bcrypt";
import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";

const saltRounds = 10;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  followedBabies: [{ type: SchemaTypes.ObjectId, ref: "Baby" }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
