import axios from 'axios';

export async function fetchFXRates(assets) {
    const results = [];

    try {
        const response = await axios.get('https://api.fxratesapi.com/latest');
        const rates = response.data.rates;

        for (const asset of assets) {
            const symbol = asset.symbol.toUpperCase();

        if (symbol === 'USD') {
            // USD to USD = 1
            results.push({ asset, price: 1 });
            continue;
        }

        const rate = rates[symbol];
            if (typeof rate !== 'undefined') {
                results.push({ asset, price: rate });
            } else {
                console.warn(`⚠️ [FXRatesAPI] No rate found for ${asset.name} (${asset.symbol})`);
            }
        }
    } catch (err) {
        console.error('❌ [FXRatesAPI] Error fetching rates:', err.message);
    }
    
    return results; // array { asset, price }
}
