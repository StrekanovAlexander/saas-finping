import axios from 'axios';

export async function fetchYahooPrices(assets) {
  const results = [];

  for (const asset of assets) {
    try {
      const symbol = asset.externalId || asset.symbol; // use externalId for Yahoo ticker
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`;

      const response = await axios.get(url, {
        // headers: {
        //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36',
        //   'Accept': 'application/json',
        // },
      });

      const result = response.data?.chart?.result?.[0]?.meta;

      if (result && result.regularMarketPrice) {
        results.push({ asset, price: result.regularMarketPrice });
      } else {
        console.warn(`⚠️ [Yahoo] No price for ${asset.name} (${symbol})`);
      }
    } catch (err) {
      console.error(`❌ [Yahoo] Error fetching ${asset.name}:`, err.message);
    }
  }

  return results;
}
