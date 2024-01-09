import express, { RequestHandler } from "express";
import { cookieSessionMiddleware } from "./cookieSession";
import "express-async-errors";
import userRouter from "./routes/userRoutes";
import babyRouter from "./routes/babyRoutes";
import { errorHandler } from "./errorHandler";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware as RequestHandler);

app.use(userRouter);
app.use(babyRouter);

app.use(errorHandler);
