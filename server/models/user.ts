// server/src/models/user.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  password: string;
  name?: string;
  gender?: string;
  babies?: { name: string; dueDate: Date }[];
}

const UserSchema = new Schema<IUser>({
  userId: {type: String, required: false},
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  gender: String,
  babies: [
    {
      name: String,
      dueDate: Date,
    },
  ],
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
