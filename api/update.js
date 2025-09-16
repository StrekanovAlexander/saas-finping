import { updateAssetPrices } from "../src/services/priceUpdater.js";

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        await updateAssetPrices();
        res.status(200).json({ success: true, message: "Assets updated (cron)" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}