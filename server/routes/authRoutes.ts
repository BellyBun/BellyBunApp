// server/src/routes/authRoutes.ts
import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add-info', authController.addUserInfo);
router.post('/create-baby', authController.createBaby);
router.post('/signout', authController.signOut);
router.get('/users', authController.getAllUsers); // Add this line


export default router;
