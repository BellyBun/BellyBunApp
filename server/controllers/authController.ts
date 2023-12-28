import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import argon2 from "argon2";
import * as Yup from "yup";
import { Session } from "express-session";

interface CustomSession extends Session {
  userId?: string | null;
  // isAdmin?: boolean;
  // isSignedIn?: boolean;
}

const registerSchema = Yup.object({
  userName: Yup.string(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = await registerSchema.validate(req.body);

      // Check if the username (email) already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username (email) already exists" });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(password);

      // Create a new user
      const newUser: IUser = new User({
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();
      console.log("User registered successfully");
      console.log("New User:", newUser); // Log the new user details

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = await loginSchema.validate(req.body);

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Verify the password using Argon2
      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Password is valid, set up the session
      const customSession = req.session as CustomSession;
      customSession.userId = user._id.toString(); // Store user ID in the session

      // Password is valid, user is authenticated
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addUserInfo: async (req: Request, res: Response) => {
    try {
      // Retrieve userId from the session
      const customSession = req.session as CustomSession;
      const userId = customSession.userId;

      // Check if the user is logged in
      if (!userId) {
        return res.status(401).json({ error: "User not logged in" });
      }

      const { name, gender } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user information
      if (name) {
        user.name = name;
      }

      if (gender) {
        user.gender = gender;
      }

      // Save the updated user to the database
      await user.save();

      res
        .status(200)
        .json({ message: "User information updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  signOut: async (req: Request, res: Response) => {
    try {
      // Find the userId in the session
      const customSession = req.session as CustomSession;
      const userId = customSession.userId;

      // If userId is not found, handle it accordingly
      if (!userId) {
        return res.status(401).json({ error: "User not logged in" });
      }

      // Clear the user ID in the session
      customSession.userId = null;

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createBaby: async (req: Request, res: Response) => {
    try {
      // Retrieve userId from the session
      const customSession = req.session as CustomSession;
      const userId = customSession.userId;

      // Check if the user is logged in
      if (!userId) {
        return res.status(401).json({ error: "User not logged in" });
      }

      const { _id, babyName, dueDate } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new baby with MongoDB generating the _id
      const newBaby = { _id, babyName, dueDate };

      // Add the baby to the user's babies array
      user.babies?.push(newBaby);

      // Save the updated user to the database
      await user.save();

      res
        .status(201)
        .json({ message: "Baby created successfully", babyId: newBaby._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getDueDate: async (req: Request, res: Response) => {
    try {
      const customSession = req.session as CustomSession;

      // Check if the user is authenticated
      if (!customSession.userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const userId = customSession.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Assuming dueDate is stored in the first baby of the user (adjust as needed)
      const dueDate = user.babies?.[0]?.dueDate;

      if (!dueDate) {
        return res
          .status(404)
          .json({ error: "Due date not found for the user" });
      }

      res.status(200).json({ dueDate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
