import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    channel: {
        type: DataTypes.ENUM('email', 'telegram'),
        allowNull: false,
        defaultValue: 'email',
    },
}, {
    tableName: 'notifications',
});

export default Notification;