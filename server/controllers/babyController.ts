import { Request, Response } from "express";
import { Baby, BabyModel } from "../models/baby-model";
import { CustomSession } from "./authController";

export async function addPregnancy(req: Request, res: Response) {
  try {
    const { babyName, dueDate } = req.body;

    // Check if the user is logged in
    const customSession = req.session as CustomSession;
    if (!customSession.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized - user not logged in" });
    }

    // Create a new baby connected to the logged-in user
    const newBaby = new BabyModel({
      babyName,
      dueDate,
      userId: customSession.userId,
    });

    // Save the baby to the database
    await newBaby.save();

    res.status(201).json({ message: "Baby added successfully", baby: newBaby });
  } catch (error) {
    console.error("Error adding baby:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllBabies(req: Request, res: Response) {}
