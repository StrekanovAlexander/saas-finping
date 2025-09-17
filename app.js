import cors from 'cors'
import express from 'express';
import { assetRoutes, notificationRoutes, trackingRoutes, userRoutes } from './src/routes/index.js';
import { updateAssetPrices, runUpdateAssetPrices } from './src/services/priceUpdater.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// runUpdateAssetPrices(); setInterval(runUpdateAssetPrices, 15 * 60 * 1000);

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get("/update", async (req, res) => {
  try {
    await runUpdateAssetPrices();
    res.json({ success: true, message: "Database was updated!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    // await updateAssetPrices();
    res.json({ success: true, message: "Database is connected!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use('/api/assets', assetRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/trackings', trackingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
}
