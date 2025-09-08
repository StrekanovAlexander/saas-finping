import Asset from './Asset.js';
import Tracking from './Tracking.js';
import User from './User.js';

User.hasMany(Tracking, { foreignKey: 'userId' });
Tracking.belongsTo(User, { foreignKey: 'userId' });

Asset.hasMany(Tracking, { foreignKey: 'assetId' });
Tracking.belongsTo(Asset, { foreignKey: 'assetId' });

export { Asset, Tracking, User };