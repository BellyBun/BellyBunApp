import { Request, Response } from "express";
import { BabyModel } from "../models/baby-model";

export async function createPregnancy(req: Request, res: Response) {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const userId = req.user!._id;

  const pregnancyData = {
    ...req.body,
    userId: userId,
  };

  const pregnancy = await BabyModel.create(pregnancyData);
  console.log("Created Pregnancy:", pregnancy);

  await pregnancy.save();
  console.log("Saved Pregnancy:", pregnancy);

  res.status(201).json(pregnancy);
}

export function getBabiesByUser(req: Request, res: Response) {}
