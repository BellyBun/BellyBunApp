import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../server/routes/authRoutes'
import session from 'express-session';




dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/bellybun';
const port = 3000;


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB Atlas');

    // Select the database
    mongoose.connection.useDb('bellybun');

    // Check existing collections
    // const collections = await mongoose.connection.db.collections();
    // console.log('Collections:', collections.map((collection) => collection.collectionName));
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
  }
};


app.set('trust proxy', 1)

// Connect to MongoDB
connectToMongoDB();

// Set up express-session middleware
app.use(
  session({
    name: 'session',
    secret: 'YourSecretHere',
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks in milliseconds
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
    },
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// Use the routes in your Express application
app.use('/api', authRoutes);


// Start the server after connecting to the database
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
