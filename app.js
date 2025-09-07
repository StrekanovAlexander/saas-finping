import express from 'express';
import sequelize from './src/config/db.js';
import assetRoutes from './src/routes/assetRoutes.js';
import trackingRoutes from './src/routes/trackingRoutes.js';

import './src/cron/checkTrackings.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/assets', assetRoutes);
app.use('/api/trackings', trackingRoutes);

const PORT = process.env.PORT || 3000;

try {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
}