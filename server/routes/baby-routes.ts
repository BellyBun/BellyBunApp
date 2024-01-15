import { Router } from "express";
import userRouter from "./user-routes";
import { createPregnancy } from "../controllers/baby-controller";
import { authenticateUser } from "../middlewares/authenticate";

export const babyRouter = Router();

userRouter.post("/api/baby/create", authenticateUser, createPregnancy);

export default babyRouter;
