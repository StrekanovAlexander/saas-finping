import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    getNotifications,
    getUserNotifications,
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.get('/user/me', authMiddleware, getUserNotifications);

export default router;
