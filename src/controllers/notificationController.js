import { Asset, Notification, User } from '../models/index.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ include: [
            { model: Asset, attributes: [ 'name', 'symbol', 'type', 'dataSource' ] }, 
            { model: User, attributes: [ 'email'] }
        ] });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.findAll({ 
            where: { userId },
            order: [["createdAt", "DESC"]], 
            include: [
                { model: Asset, attributes: [ 'name', 'symbol', 'type', 'dataSource' ] }, 
                { model: User, attributes: [ 'email'] }
            ] 
        });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
