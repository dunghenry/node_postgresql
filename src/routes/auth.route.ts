import { Router } from 'express';
const router = Router();
import authController from '../controllers/auth.controller';
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', authController.getUsers);
export default router;
