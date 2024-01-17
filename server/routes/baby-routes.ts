import { Router } from "express";
import {
  createPregnancy,
  getBabiesByUser,
  setActiveBaby,
} from "../controllers/baby-controller";

export const babyRouter = Router();

babyRouter.post("/api/baby/create", createPregnancy);
babyRouter.get("/api/baby/:email", getBabiesByUser);
babyRouter.put("/api/baby/setActive/:id", setActiveBaby);

export default babyRouter;
