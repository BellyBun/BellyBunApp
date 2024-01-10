import express, { RequestHandler } from "express";
import "express-async-errors";
import { cookieSessionMiddleware } from "./cookieSession";
import { errorHandler } from "./errorHandler";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware as RequestHandler);

app.use(errorHandler);
