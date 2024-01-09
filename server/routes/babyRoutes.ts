// server/src/routes/babyRoutes.ts
import express from "express";
import { addPregnancy, getAllBabies } from "../controllers/babyController";

const babyRouter = express.Router();

babyRouter.post("/api/baby/create", addPregnancy);
babyRouter.get("/api/baby/get", getAllBabies);

export default babyRouter;
