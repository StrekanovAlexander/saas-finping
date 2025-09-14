import pkg from 'sequelize';
const { Op } = pkg;
import { Asset } from '../models/index.js';
import { fetchCoinGeckoPrices } from './apis/coingecko.js';
import { fetchFXRates } from './apis/fxrates.js';
import { fetchYahooPrices } from './apis/yahoo.js';

export async function updateAssetPrices() {
    try {
        const assets = await Asset.findAll({
            where: { dataSource: { [Op.ne]: null } }
        });

        if (!assets.length) {
            console.log('⚠️ No assets to update');
            return;
        }
        // Group assets by dataSource
        const bySource = assets.reduce((acc, asset) => {
            if (!acc[asset.dataSource]) acc[asset.dataSource] = [];
            acc[asset.dataSource].push(asset);
            return acc;
        }, {});
        // --- CoinGecko update ---
        const updates = await fetchCoinGeckoPrices(bySource.coingecko);
        for (const { asset, price } of updates) {
            asset.previousPrice = asset.price;
            asset.price = price;
            asset.lastUpdated = new Date();
            await asset.save();
            console.log(`✅ [CoinGecko] Updated ${asset.name} (${asset.symbol}) → $${price}`);
        }
        // --- FxRates update ---
        if (bySource.fxrates) {
            const updates = await fetchFXRates(bySource.fxrates);
            for (const { asset, price } of updates) {
                asset.previousPrice = asset.price;
                asset.price = price;
                asset.lastUpdated = new Date();
                await asset.save();
                console.log(`✅ [FXRatesAPI] Updated ${asset.name} (${asset.symbol}) → ${price}`);
            }
        }
        // --- Yahoo Finance update (stub for now) ---
        if (bySource.yahoo) {
            const results = await fetchYahooPrices(bySource.yahoo);
            for (const { asset, price } of results) {
                asset.previousPrice = asset.price;
                asset.price = price;
                asset.lastUpdated = new Date();
                await asset.save();
                console.log(`✅ [Yahoo] Updated ${asset.name} (${asset.symbol}) → $${price}`);
            }
        }
    } catch (err) {
        console.error('❌ Error updating asset prices:', err.message);
    }
}

export async function runUpdateAssetPrices() {
  try {
    console.log('Running asset prices update at', new Date().toISOString());
    await updateAssetPrices();
    console.log('Asset prices updated successfully');
  } catch (err) {
    console.error('Error updating asset prices:', err);
  }
}
