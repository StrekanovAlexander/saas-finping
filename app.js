import cors from 'cors'
import express from 'express';
import sequelize from './src/config/db.js';

import assetRoutes from './src/routes/assetRoutes.js';
import trackingRoutes from './src/routes/trackingRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// import './src/cron/checkTrackings.js';
// import './src/cron/updateAssets.js';

const app = express();
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ success: true, message: "Database is connected!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use('/api/assets', assetRoutes);
app.use('/api/trackings', trackingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

try {
    // await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
}
