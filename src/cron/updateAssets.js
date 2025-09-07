import cron from 'node-cron';
import { updateAssetPrices } from '../services/priceUpdater.js';

// Run every 5 minutes
cron.schedule('*/1 * * * *', async () => {
  console.log('⏳ Running scheduled price update...');
  await updateAssetPrices();
});