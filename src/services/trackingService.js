import { Asset, Tracking } from '../models/index.js';

/**
 * Check all active trackings and send alerts if conditions are met.
 * Limits number of notifications and respects minimal interval between alerts.
 */
export async function checkTrackings() {
    try {
        const trackings = await Tracking.findAll({
            where: { active: true },
            include: Asset
        });

        for (const tracking of trackings) {
            const asset = tracking.Asset;
            if (!asset || asset.price === null) continue;

            const price = parseFloat(asset.price);
            const threshold = parseFloat(tracking.threshold);

            let triggered = false;

            if (tracking.direction === 'above' && price > threshold) triggered = true;
            if (tracking.direction === 'below' && price < threshold) triggered = true;

            if (triggered) {
                const now = new Date();
                const lastNotified = tracking.lastNotifiedAt ? new Date(tracking.lastNotifiedAt) : null;
                const minutesSinceLast = lastNotified ? (now - lastNotified) / (1000 * 60) : Infinity;

                // Limit notifications checking
                if (tracking.notificationsSent < tracking.maxNotifications &&
                    minutesSinceLast >= tracking.notificationIntervalMinutes) {
                    // (Email/Telegram)
                    console.log(`🔔 ALERT: ${asset.name} (${asset.symbol}) price ${price} ${tracking.direction} threshold ${threshold} [Channel: ${tracking.channel}]`);
                
                    tracking.notificationsSent += 1;
                    tracking.lastNotifiedAt = now;
                    await tracking.save();
                }
            }
        }
    } catch (err) {
        console.error('Error checking trackings:', err);
    }
}
