import { Request, Response } from "express";
import { assert } from "../errorHandler";
import { UserModel } from "../models/user-model";

export async function createUser(req: Request, res: Response) {
  const { email } = req.body;

  // check if user with given email already exists
  const existingUser = await UserModel.findOne({ email });

  // if user already exists, throw an error
  assert(existingUser === null, 409, "User already exists!");

  const user = await UserModel.create(req.body);
  await user.save();

  const userResponse: any = user.toObject();
  delete userResponse.password;

  return res.status(201).json(userResponse);
}
