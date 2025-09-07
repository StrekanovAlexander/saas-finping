import axios from 'axios';

export async function fetchCoinGeckoPrices(assets) {
    const results = [];
    const ids = assets
        .filter(a => a.externalId)
        .map(a => a.externalId.toLowerCase())
        .join(',');

    if (!ids) return results;
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    const response = await axios.get(url);

    for (const asset of assets) {
        const data = response.data[asset.externalId?.toLowerCase()];
        if (data && typeof data.usd !== 'undefined') {
            results.push({ asset, price: data.usd });
        } else {
            console.warn(`⚠️ [CoinGecko] No USD price for ${asset.name} (${asset.symbol})`);
        }
    }

    return results; // array { asset, price }
}
