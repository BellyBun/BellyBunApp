import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  const { email } = req.body;

  // Check that if email address is already registered
  const existingUser = await UserModel.findOne({ email });

  // If email already has an account, throw an error
  assert(existingUser === null, 409, "User already exists!");

  const user = await UserModel.create(req.body);
  await user.save();

  const userResponse: any = user.toObject();
  delete userResponse.password;

  return res.status(201).json(userResponse);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  assert(user !== null, 401, "Invalid email or password");

  const passwordMatch = await bcrypt.compare(password, user!.password);

  assert(passwordMatch, 401, "Invalid email or password");

  req.session!.user = {
    _id: user!.id,
    email: user!.email,
  };

  res.status(200).json({
    _id: user!.id,
    email: user!.email,
  });
}

export function signoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json({ message: "Signout successful" });
}

export function checkAuth(req: Request, res: Response) {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(204).json({ success: false, user: null });
  }
}
