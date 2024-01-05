// server/src/routes/authRoutes.ts
import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/add-username', authController.addUsername);  
router.post('/create-baby/:userId', authController.createBaby); 
router.post('/signout', authController.signOut);
router.get('/users', authController.getAllUsers); // Add this line
router.get('/get-due-date/:userId', authController.getDueDate); // Add this line



export default router;
