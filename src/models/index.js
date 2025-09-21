import Asset from './Asset.js';
import AssetPrice from './AssetPrice.js';
import Notification from './Notification.js';
import Tracking from './Tracking.js';
import User from './User.js';

User.hasMany(Tracking, { foreignKey: 'userId' });
Tracking.belongsTo(User, { foreignKey: 'userId' });

Asset.hasMany(Tracking, { foreignKey: 'assetId' });
Tracking.belongsTo(Asset, { foreignKey: 'assetId' });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

Asset.hasMany(Notification, { foreignKey: "assetId" });
Notification.belongsTo(Asset, { foreignKey: "assetId" });

Asset.hasMany(AssetPrice, { foreignKey: "assetId" });
AssetPrice.belongsTo(Asset, { foreignKey: "assetId", onDelete: "CASCADE" });

export { Asset, AssetPrice, Tracking, User, Notification };