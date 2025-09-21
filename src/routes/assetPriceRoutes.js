import express from 'express';
import { getAssetPrices } from '../controllers/assetPriceController.js';

const router = express.Router();

router.get('/:id', getAssetPrices);

export default router;