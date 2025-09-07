import express from 'express';
import {
    createTracking,
    getTrackings,
    getTracking,
    updateTracking,
    deleteTracking
} from '../controllers/trackingController.js';

const router = express.Router();

router.post('/', createTracking);
router.get('/', getTrackings);
router.get('/:id', getTracking);
router.put('/:id', updateTracking);
router.delete('/:id', deleteTracking);

export default router;
