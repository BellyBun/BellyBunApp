import { Request, Response } from "express";
import { BabyModel } from "../models/baby-model";
import { UserModel } from "../models/user-model";
import { assert } from "../errorHandler";

export async function createPregnancy(req: Request, res: Response) {
  // Check if the user is logged in
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const userId = req.session.user._id;

  const babyData = {
    ...req.body,
    userId: userId,
  };

  try {
    const baby = await BabyModel.create(babyData);
    await baby.save();
    await baby.populate("userId");
    return res.status(201).json(baby);
  } catch (error) {
    console.error("Error creating pregnancy:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBabiesByUser(req: Request, res: Response) {
  const userEmail = req.params.email;
  console.log("User Email:", userEmail);

  const user = await UserModel.findOne({ email: userEmail });
  console.log("Found User:", user);

  assert(user !== null, 404, "User not found");

  const babies = await BabyModel.find({ userId: user?._id }).populate("userId");

  res.json(babies);
}
