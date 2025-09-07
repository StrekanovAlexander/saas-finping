import cron from 'node-cron';
import { checkTrackings } from '../services/trackingService.js';

// Every 30 seconds
cron.schedule('*/30 * * * * *', () => {
  console.log('Checking trackings...');
  checkTrackings();
});