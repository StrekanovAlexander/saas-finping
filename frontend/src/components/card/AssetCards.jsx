import { useEffect, useState } from "react";
import AssetCard from "./AssetCard.jsx";
import Spinner from "../spinner/Spinner.jsx";

export default function AssetCards() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchAssets() {
      try {
        const url = "https://app.finping.space/api/assets";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch assets");
        const data = await res.json();
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const cryptos = assets.filter(el => el.type === "crypto" && el.previousPrice > 0).slice(0, 3).sort((a, b) => a.name - b.name);
  const commodities = assets.filter(el => el.type === "commodity" && el.previousPrice > 0).slice(0, 3).sort((a, b) => a.name - b.name);
  const fiats = assets.filter(el => el.type === "fiat" && el.previousPrice > 0).slice(0, 3).sort((a, b) => a.name - b.name);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* State */}  
      {loading && <div><Spinner/></div>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssetCard title="Assets" data={cryptos} />
          <AssetCard title="Commodities" data={commodities} />
          <AssetCard title="Markets" data={fiats} />
        </div>
      )}
    </section>
  );
}
