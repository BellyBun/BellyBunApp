import { Router } from "express";
import { createUser } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post("/api/users/create", createUser);

export default userRouter;