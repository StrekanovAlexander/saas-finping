import express from 'express';
import {
    createAsset,
    getAssets,
    getAsset,
    updateAsset,
    deleteAsset
} from '../controllers/assetController.js';

const router = express.Router();

router.post('/', createAsset);
router.get('/', getAssets);
router.get('/:id', getAsset);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

export default router;
