import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Asset = sequelize.define('Asset', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    externalId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING, // crypto, fiat, commodity
        allowNull: false,
    },
    dataSource: {
        type: DataTypes.ENUM('coingecko', 'exchangerate', 'yahoo'),
        allowNull: false,
        defaultValue: 'coingecko'
    },
    price: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
    },
    lastUpdated: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'assets',
});

export default Asset;
