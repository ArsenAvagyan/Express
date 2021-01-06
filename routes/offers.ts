import express from 'express';
import { authMiddleware } from '../helpers/auth';
import {
    createOfferController,
    getOffersController,
} from '../controllers/offers';

const router = express.Router();

router.post('/', authMiddleware, createOfferController);
router.get('/', authMiddleware, getOffersController);

export default router;
