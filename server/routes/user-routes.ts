import { Router } from "express";
import {
  createUser,
  loginUser,
  signoutUser,
} from "../controllers/user-controller";
import { validateCreateUser } from "../validation/user-client-validation";
import { authenticateUser } from "../middlewares/authenticate";

export const userRouter = Router();

userRouter.post("/api/users/create", validateCreateUser, createUser);
userRouter.get("/api/users/auth", authenticateUser);
userRouter.post("/api/users/login", loginUser);
userRouter.post("/api/users/signout", signoutUser);

export default userRouter;
