import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../server/routes/authRoutes'


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/bellybun';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
  }
};

// Connect to MongoDB
connectToMongoDB();

// Set up cookie session middleware
// app.use(
//   cookieSession({
//     name: 'session',
//     secret: 'YourSecretHere',
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     secure: false, // Set to true in production with HTTPS
//     httpOnly: true,
//   })
// );

// Parse incoming JSON payloads
app.use(express.json());

// Use the routes in your Express application
app.use('/api', authRoutes);


// Start the server after connecting to the database
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
