import { AssetPrice, Asset } from '../models/index.js';

export const getAssetPrices = async (req, res) => {
    try {
        const data = await AssetPrice.findAll({
            order: [["createdAt", "ASC"]],
            where: {assetId: req.params.id},
            include: [
                { model: Asset, attributes: [ 'name', 'symbol', 'type', 'dataSource' ] }, 
            ] 
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};