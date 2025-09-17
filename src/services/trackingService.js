import { Asset, Notification, Tracking } from '../models/index.js';
import { formatNumber } from '../utils/formats.js';

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
                    // Notifications
                    // console.log(`ALERT: ${asset.name} (${asset.symbol}) price ${price} ${tracking.direction} threshold ${threshold} [Channel: ${tracking.channel}]`);
                    const { assetId, userId, channel } = tracking;
                    const message = `${asset.name} (${asset.symbol}) price ${formatNumber(price)} ${tracking.direction} threshold ${formatNumber(threshold)}`;    

                    try {
                        await Notification.create({ assetId, userId, message, channel });
                    } catch (err) {
                        console.log(err);
                    }    

                    // tracking.notificationsSent += 1;
                    // tracking.lastNotifiedAt = now;
                    tracking.active = false;
                    await tracking.save();
                }
            }
        }
    } catch (err) {
        console.error('Error checking trackings:', err);
    }
}
