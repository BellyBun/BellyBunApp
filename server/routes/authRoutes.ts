// server/src/routes/authRoutes.ts
import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add-info', authController.addUserInfo);
router.post('/create-baby', authController.createBaby);
router.post('/logout', authController.logOut);

export default router;
