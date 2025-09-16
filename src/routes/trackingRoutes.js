import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    createTracking,
    getTrackings,
    getTracking,
    updateTracking,
    deleteTracking,
    runTrackingsManually,
    getUserTrackings
} from '../controllers/trackingController.js';

const router = express.Router();

router.post('/', createTracking);
router.get('/', getTrackings);
router.get('/:id', getTracking);
router.put('/:id', updateTracking);
router.delete('/:id', authMiddleware, deleteTracking);

// router.get('/user/:userId', getUserTrackings);
router.get('/user/me', authMiddleware, getUserTrackings);

router.post('/run', runTrackingsManually);

export default router;
