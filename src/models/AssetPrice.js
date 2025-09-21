import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../config/db.js';

const AssetPrice = sequelize.define('AssetPrice', {
    id: { 
        type: DataTypes.BIGINT, 
        autoIncrement: true, 
        primaryKey: true 
    },
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
    },
}, {
    tableName: 'assetPrices',
});

export default AssetPrice;