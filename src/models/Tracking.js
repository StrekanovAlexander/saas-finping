import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Asset from './Asset.js';

const Tracking = sequelize.define('Tracking', {
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asset,
            key: 'id',
        },
    },
    threshold: {
        type: DataTypes.DECIMAL(20,8),
        allowNull: false,
    },
    direction: {
        type: DataTypes.ENUM('above','below'), // 'above' = price > threshold, 'below' = price < threshold
        allowNull: false,
    },
    channel: {
        type: DataTypes.STRING, // 'email', 'telegram'
        allowNull: false,
        defaultValue: 'email',
  },
  active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'tracking',
});

Asset.hasMany(Tracking, { foreignKey: 'assetId' });
Tracking.belongsTo(Asset, { foreignKey: 'assetId' });

export default Tracking;
