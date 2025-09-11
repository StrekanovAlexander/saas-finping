import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Tracking = sequelize.define('Tracking', {
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    threshold: {
        type: DataTypes.DECIMAL(20,8),
        allowNull: false,
    },
    direction: {
        type: DataTypes.ENUM('above','below'),
        allowNull: false,
    },
    channel: {
        type: DataTypes.ENUM('email', 'telegram'),
        allowNull: false,
        defaultValue: 'email',
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    notificationsSent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    maxNotifications: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    lastNotifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    notificationIntervalMinutes: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
    },
}, {
    tableName: 'trackings',
});

export default Tracking;
