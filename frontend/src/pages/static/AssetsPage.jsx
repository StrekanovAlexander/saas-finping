import { useState, useEffect } from "react";
import Card from "../../components/card/Card.jsx";
import Icon from "../../components/card/Icon.jsx";
import Trend from "../../components/card/Trend.jsx";
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
        const url = `${import.meta.env.VITE_API_URL}/assets`;
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
    <div className="w-full md:container md:mx-auto md:px-4 py-8">
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
          <table className="hidden md:table w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-500 text-sm">
              <tr>
                <th className="text-left py-2 px-4 uppercase">Name</th>
                <th className="text-right py-2 px-4 uppercase">Price</th>
                <th className="text-right py-2 px-4 uppercase">Trend</th>
                <th className="text-right py-2 px-4 uppercase">Previous</th>
                <th className="text-center py-2 px-4 uppercase">Type</th>
                <th className="text-center py-2 px-4 uppercase">Source</th>
                <th className="text-center py-2 px-4 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((el) => {
                  return (
                    <tr
                      key={el.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <td className="px-3 py-3 flex items-center gap-3">
                        <Icon icon={el.icon} />
                        <div>
                          <p className="font-semibold text-gray-800 leading-tight">{el.name}</p>
                          <p className="text-xs text-gray-500">{el.symbol}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-gray-800 leading-tight">
                        {formatNumber(el.price)}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Trend price={el.price} previousPrice={el.previousPrice} />
                      </td>
                      <td className="px-3 py-3 text-right text-gray-500">
                        { formatNumber(el.previousPrice) }
                      </td>
                      <td className="text-center px-3 py-3 capitalize">{el.type}</td>
                      <td className="text-center px-3 py-3 capitalize">{el.dataSource}</td>
                      <td className="text-center px-3 py-3">{ formatDate(el.lastUpdated) }</td>
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
          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {filteredAssets.map((el) => 
              <Card key={el.id} item={el} />
            )}
          </div>   
          {/* Mobile End */}      
         </div>
       </div>
       )}
     </div>
   );
 }
