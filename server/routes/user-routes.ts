import { Router } from "express";
import {
  checkAuth,
  createUser,
  loginUser,
  signoutUser,
  updateUserWelcomeStatus,
} from "../controllers/user-controller";
import { validateCreateUser } from "../validation/user-client-validation";

export const userRouter = Router();

userRouter.post("/api/users/create", validateCreateUser, createUser);
userRouter.get("/api/users/auth", checkAuth);
userRouter.post("/api/users/login", loginUser);
userRouter.post("/api/users/signout", signoutUser);
userRouter.put("/api/users/:id", updateUserWelcomeStatus);

export default userRouter;
