import { Asset, Notification, Tracking, User } from '../models/index.js';
import { sendNotification } from './resendService.js';
import notificationHtml from './templates/notificationHtml.js';
import { formatNumber } from '../utils/formats.js';

export async function checkTrackings() {
    try {
        const trackings = await Tracking.findAll({
            where: { active: true },
            include: [
                { model: Asset }, 
                { model: User, attributes: [ 'email'] }
            ] 
        });

        const notificationSet = [];
        
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
                    let userSet = notificationSet.find(el => el.email === tracking.User.email);
                    if (!userSet) {
                        userSet = { email: tracking.User.email, notifications: [] };
                        notificationSet.push(userSet);
                    }
                        
                    userSet.notifications.push(
                        `<p>Asset <strong>${asset.name} (${asset.symbol})</strong> is ${tracking.direction} your threshold (${formatNumber(threshold)}). Current price: ${formatNumber(price)}</p>`
                    );
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

        const demoEmail = 'demo@finping.space';
        notificationSet.filter(e => e.email !== demoEmail).forEach(async(el) => {
            el.notifications = el.notifications.join("");
            await sendNotification(el.email, notificationHtml(el.email, el.notifications));
        });
        
    } catch (err) {
        console.error('Error checking trackings:', err);
    }
}
