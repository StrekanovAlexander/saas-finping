import Tracking from '../models/Tracking.js';
import Asset from '../models/Asset.js';

export async function checkTrackings() {
    try {
        const trackings = await Tracking.findAll({
            where: { active: true },
            include: Asset
        });

        for (const tracking of trackings) {
            const asset = tracking.Asset;
            if (asset.price === null) continue;

            const price = parseFloat(asset.price);
            const threshold = parseFloat(tracking.threshold);

            let triggered = false;

            if (tracking.direction === 'above' && price > threshold) triggered = true;
            if (tracking.direction === 'below' && price < threshold) triggered = true;

            if (triggered) {
                console.log(`🔔 ALERT: ${asset.name} (${asset.symbol}) price ${price} ${tracking.direction} threshold ${threshold} [Channel: ${tracking.channel}]`);
            }
        }
    } catch (err) {
        console.error('Error checking trackings:', err);
    }
}
