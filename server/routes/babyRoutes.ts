// server/src/routes/babyRoutes.ts
import express from "express";
import { addPregnancy, getAllBabies } from "../controllers/babyController";

const babyRouter = express.Router();

babyRouter.post("/create", addPregnancy);
babyRouter.get("/get-babies", getAllBabies);

export default babyRouter;
