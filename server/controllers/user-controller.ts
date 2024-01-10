import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with a secure secret key

export function checkAuth(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(204).json({ success: false, user: null });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      _id: string;
      email: string;
    };
    res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    res.status(204).json({ success: false, user: null });
  }
}

export async function createUser(req: Request, res: Response) {
  const { email } = req.body;

  // Check that if email address is already registered
  const existingUser = await UserModel.findOne({ email });

  // If email already has an account, throw an error
  assert(existingUser === null, 409, "User already exists!");

  const user = await UserModel.create(req.body);
  await user.save();

  const token = jwt.sign({ _id: user.id, email: user.email }, SECRET_KEY);

  res.status(201).json({ _id: user.id, email: user.email, token });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  assert(user !== null, 401, "Invalid email or password");

  const passwordMatch = await bcrypt.compare(password, user!.password);

  assert(passwordMatch, 401, "Invalid email or password");

  const token = jwt.sign({ _id: user!.id, email: user!.email }, SECRET_KEY, {
    expiresIn: "7d",
  });

  res.status(200).json({ _id: user!.id, email: user!.email, token });
}

export function signoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json({ message: "Signout successful" });
}
