import { Router } from "express";
import {
  createPregnancy,
  getBabiesByUser,
} from "../controllers/baby-controller";

export const babyRouter = Router();

babyRouter.post("/api/baby/create", createPregnancy);
babyRouter.get("/api/baby/:email", getBabiesByUser);

export default babyRouter;
