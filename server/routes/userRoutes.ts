// server/src/routes/authRoutes.ts
import express from "express";
import authController from "../controllers/authController";

const userRouter = express.Router();

userRouter.post("/api/user/register", authController.register);
userRouter.post("/api/user/login", authController.login);
userRouter.post("/api/user/add-info/:userId", authController.addUserInfo);
userRouter.post("/api/user/create-baby/:userId", authController.createBaby);
userRouter.post("/api/user/signout", authController.signOut);
userRouter.get("/api/user/users", authController.getAllUsers);
userRouter.get("/api/user/get-due-date/:userId", authController.getDueDate);

export default userRouter;
