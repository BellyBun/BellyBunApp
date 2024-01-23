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
    username: user!.username,
    isWelcomed: user!.isWelcomed,
  };

  res.status(200).json({
    _id: user!.id,
    email: user!.email,
    username: user!.username,
    isWelcomed: user!.isWelcomed,
  });
}

export function signoutUser(req: Request, res: Response) {
  console.log("Signing out user:", req.session?.user);
  req.session = null;
  res.status(204).json({ message: "Signout successful" });
}

export async function updateUserWelcomeStatus(req: Request, res: Response) {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const userId = req.session.user._id;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { isWelcomed: true } },
      { new: true }
    );

    assert(updatedUser !== null, 404, "User not found");

    // Update the user in the session
    req.session.user.isWelcomed = true;

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user welcome status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export function checkAuth(req: Request, res: Response) {
  if (req.session && req.session.user) {
    res.status(200).json({ success: true, user: req.session.user });
  } else {
    res.status(204).json({ success: false, user: null });
  }
}
