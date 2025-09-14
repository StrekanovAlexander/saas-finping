import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatDate, formatNumber } from "../../utils/formats.jsx"
import Spinner from "../../components/spinner/Spinner.jsx";

export default function AssetsPage() {
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

  return (
    <section className="max-w-6xl mx-auto py-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">Assets</h1>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-teal-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
        </span>
        <span className="ml-2 px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
          LIVE
        </span>
      </div>
      {/* State */}
      {loading && <div><Spinner /></div>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Data Source</th>
                <th className="px-4 py-3">Price, $</th>
                <th className="px-4 py-3">Previous</th>
                <th className="px-4 py-3">Change</th>
                <th className="px-4 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((item) => {
                const isUp = item.price > item.previousPrice;
                const change = item.price - item.previousPrice;
                const percent = item.previousPrice
                  ? ((change / item.previousPrice) * 100).toFixed(2)
                  : "0.00";

                return (
                  <tr key={item.symbol} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 font-medium">{item.symbol}</td>
                    <td className="px-4 py-3 capitalize">{item.type}</td>
                    <td className="px-4 py-3 capitalize">{item.dataSource}</td>
                    <td className="px-4 py-3">{formatNumber(item.price)}</td>
                    <td className="px-4 py-3">{formatNumber(item.previousPrice)}</td>
                    <td
                      className={`px-4 py-3 flex items-center gap-1 font-semibold ${
                        isUp ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isUp ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {percent}%
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(item.lastUpdated)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
