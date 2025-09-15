import pkg from 'sequelize';
const { DataTypes } = pkg;
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
        type: DataTypes.ENUM('crypto','fiat','commodity'),
        allowNull: false,
    },
    dataSource: {
        type: DataTypes.ENUM('coingecko', 'exchangerate', 'yahoo', 'fxrates'),
        allowNull: false,
        defaultValue: 'coingecko'
    },
    price: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
    },
    previousPrice: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
    },
    lastUpdated: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    prior: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: false,
        defaultValue: '3'
    },
}, {
    tableName: 'assets',
});

export default Asset;
