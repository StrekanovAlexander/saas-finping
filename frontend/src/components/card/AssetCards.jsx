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


  // const assets = [
  //   { name: "Bitcoin", current: 26450, previous: 26000 },
  //   { name: "Ethereum", current: 1650, previous: 1700 },
  //   { name: "Dogecoin", current: 0.064, previous: 0.07 },
  // ];

  // const commodities = [
  //   { name: "Gold", current: 1930, previous: 1950 },
  //   { name: "Oil", current: 82, previous: 80 },
  //   { name: "Silver", current: 23, previous: 22 },
  // ];

  // const markets = [
  //   { name: "USD/EUR", current: 0.92, previous: 0.91 },
  //   { name: "USD/JPY", current: 147, previous: 146 },
  //   { name: "GBP/USD", current: 1.25, previous: 1.26 },
  // ];

  const cryptos = assets.filter(el => el.type === "crypto").slice(0, 3).sort((a, b) => a.name - b.name);
  const commodities = assets.filter(el => el.type === "commodity").slice(0, 3).sort((a, b) => a.name - b.name);
  const fiats = assets.filter(el => el.type === "fiat").slice(0, 3).sort((a, b) => a.name - b.name);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* State */}  
      {loading && <p className="text-gray-500"><Spinner /></p>}
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
