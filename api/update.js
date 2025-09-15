import { updateAssetPrices } from "../src/services/priceUpdater.js";

export default async function handler(req, res) {
    try {
        await updateAssetPrices();
        res.status(200).json({ success: true, message: "Assets updated (cron)" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}