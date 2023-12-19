import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import argon2 from 'argon2';
import mongoose from 'mongoose';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { userName, email, password } = req.body;

      // Check if the username (email) already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Username (email) already exists' });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(password);

      // Create a new user
      const newUser: IUser = new User({
        userName,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();
      console.log('User registered successfully');
      console.log('New User:', newUser); // Log the new user details

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify the password using Argon2
      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Password is valid, user is authenticated
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addUserInfo: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params; // Assuming you pass userId as a parameter in the URL
      const { name, gender } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
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

      res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  logOut: async (req: Request, res: Response) => {
    try {
      // Implement adding user information logic
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createBaby: async (req: Request, res: Response) => {
    try {
      // Implement adding user information logic
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default authController;
