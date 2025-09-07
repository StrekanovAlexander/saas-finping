import axios from 'axios';

export async function fetchExchangeRates(assets) {
    const results = [];

    const symbols = assets
        .map(a => a.symbol.toUpperCase())
        .filter(s => s !== 'USD')
        .join(',');

    if (!symbols && !assets.some(a => a.symbol.toUpperCase() === 'USD')) return results;

    try {
        const response = await axios.get(`https://open.er-api.com/v6/latest/USD`);
        const rates = response.data.quotes;

        for (const asset of assets) {
            if (asset.symbol.toUpperCase() === 'USD') {
                results.push({ asset, price: 1 });
                continue;
            }

            const key = `USD${asset.symbol.toUpperCase()}`;
            const rate = rates[key];

            if (typeof rate !== 'undefined') {
                results.push({ asset, price: rate });
            } else {
                console.warn(`⚠️ [ExchangeRate] No rate found for ${asset.name} (${asset.symbol})`);
            }
        }
    } catch (err) {
        console.error('❌ [ExchangeRate] Error fetching rates:', err.message);
    }

    return results; // Array { asset, price }
}
