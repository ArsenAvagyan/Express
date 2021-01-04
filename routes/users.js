import express from 'express';
import { authMiddleware } from '../helpers/auth';
import { createUserController, verificationController, loginController, getUserController, addAgeController } from '../controllers/users';

const router = express.Router();

router.post('/', createUserController);
router.post('/verification', verificationController);
router.post('/login', loginController);
router.get('/', authMiddleware, getUserController);
router.patch('/', authMiddleware, addAgeController);


module.exports = router;
