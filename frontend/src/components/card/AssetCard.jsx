import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatNumber } from "../../utils/formats.jsx";

function AssetCard({ title, data }) {
  return (
    <div className="bg-gray-50 rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2 justify-between">
        <div className="flex items-center">
          { title }
          <span className="flex h-2 w-2 ml-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
          </span>
        </div>
        <span className="ml-2 px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded-full">
          LIVE
        </span>

      </h3>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Current, $</th>
              <th className="px-4 py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isUp = item.price > item.previousPrice;
              const change = item.price - item.previousPrice;
              const percent = ((change / item.previousPrice) * 100).toFixed(2);

              return (
                <tr key={item.name} className="border-t">
                  <td className="px-4 py-2 font-medium">{item.symbol}</td>
                  <td className="px-4 py-2">{formatNumber(item.price)}</td>
                  <td
                    className={`px-4 py-2 flex items-center gap-1 font-semibold ${
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-1">Last updated: 5s ago</p>      
    </div>
  );
}

export default AssetCard;