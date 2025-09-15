import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Spinner from "../../components/spinner/Spinner.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx"

export default function AssetsPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType ? asset.type === filterType : true;
    const matchesSource = filterSource ? asset.dataSource === filterSource : true;

    return matchesSearch && matchesType && matchesSource;
  });

  const minutesAgo = Math.floor((new Date() - lastUpdated) / 60000);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Assets</h1>
      <p className="text-gray-500 mb-6">
        Track prices across cryptocurrencies, commodities and fiat currencies
      </p>
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All types</option>
            <option value="crypto">Crypto</option>
            <option value="fiat">Fiat</option>
            <option value="commodity">Commodity</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All sources</option>
            <option value="coingecko">CoinGecko</option>
            <option value="exchangerate">ExchangeRate</option>
            <option value="yahoo">Yahoo Finance</option>
            <option value="fxrates">FXRates</option>
          </select>
        </div>
      </div>

      {loading && <div><Spinner /></div>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Assets</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            Updated {minutesAgo === 0 ? "just now" : `${minutesAgo} min ago`}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Symbol</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Source</th>
                <th className="text-right py-3 px-4">Price, $</th>
                <th className="text-right py-3 px-4">Prev. Price, $</th>
                <th className="text-right py-3 px-4">Trend</th>
                <th className="text-right py-3 px-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, idx) => {
                  const isUp = asset.price > asset.previousPrice;
                  const isDown = asset.price < asset.previousPrice;
                  const change = asset.price - asset.previousPrice;
                  const percent = ((change / asset.previousPrice) * 100).toFixed(2);

                  return (
                    <tr
                      key={idx}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <td className="py-3 px-4 font-medium">{asset.name}</td>
                      <td className="py-3 px-4">{asset.symbol}</td>
                      <td className="py-3 px-4 capitalize">{asset.type}</td>
                      <td className="py-3 px-4 capitalize">{asset.dataSource}</td>
                      <td className="py-3 px-4 text-right">
                        { formatNumber(asset.price) }
                      </td>
                      <td className="py-3 px-4 text-right">
                        { formatNumber(asset.previousPrice) }
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isUp && (
                          <span className="flex items-center justify-end text-green-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            { percent }%
                          </span>
                        )}
                        {isDown && (
                          <span className="flex items-center justify-end text-red-600">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            { percent }%
                          </span>
                        )}
                        {!isUp && !isDown && (
                          <span className="text-gray-500">No change</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">{ formatDate(asset.lastUpdated) }</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
