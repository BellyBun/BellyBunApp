// server/src/models/user.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBaby {
  _id: string;
  babyName?: string;
  dueDate: Date;
}

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  babies?: IBaby[];
}

const BabySchema = new Schema<IBaby>({
  _id: { type: String, required: false },
  babyName: { type: String, required: false },
  dueDate: { type: Date, required: true },
});

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  babies: [BabySchema],
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
