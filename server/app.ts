import express, { RequestHandler } from "express";
import "express-async-errors";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";
import babyRouter from "./routes/baby-routes";
import { cookieSessionMiddleware } from "./cookieSession";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware as RequestHandler);

app.use(userRouter);
app.use(babyRouter);

app.use(errorHandler);
