import { Router } from "express";
import {
  createPregnancy,
  followBaby,
  getBabiesByUser,
  setActiveBaby,
  shareFollowBaby,
} from "../controllers/baby-controller";

export const babyRouter = Router();

babyRouter.post("/api/baby/create", createPregnancy);
babyRouter.get("/api/baby/:email", getBabiesByUser);
babyRouter.put("/api/baby/setActive/:id", setActiveBaby);
babyRouter.get("/api/baby/share/:id", shareFollowBaby);
babyRouter.post("/api/baby/follow/:code", followBaby);


export default babyRouter;
