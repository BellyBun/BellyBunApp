import express from "express";
import "express-async-errors";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";
import babyRouter from "./routes/baby-routes";

export const app = express();

app.use(express.json());

app.use(userRouter);
app.use(babyRouter);

app.use(errorHandler);
