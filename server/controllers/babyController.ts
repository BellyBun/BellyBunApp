import { Request, Response } from "express";
import BabyModel, { IBaby } from "../models/baby";

// Controller to create a new baby

export async function addPregnancy(req: Request, res: Response) {
  const newPregnancy: IBaby = req.body;
  const baby = await BabyModel.create(newPregnancy);
  res.status(201).json(baby);
}

export async function getAllBabies(req: Request, res: Response) {
  const babies: IBaby[] = await BabyModel.find();
  res.json(babies);
}
