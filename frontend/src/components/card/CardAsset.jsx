import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatNumber, formatDate } from "../../utils/formats.jsx";

function CardAsset({ title, description, data }) {
  return (
    <div className="bg-white border rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        { title }
      </h3>
      <p className="text-gray-500 text-sm pb-4">
        { description }
      </p>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium text-end">Price</th>
              <th className="px-4 py-3 font-medium text-end">Trend</th>
              <th className="px-4 py-3 font-medium text-start">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              const isUp = el.price > el.previousPrice;
              const change = el.price - el.previousPrice;
              const percent = ((change / el.previousPrice) * 100).toFixed(2);
              return (
                <tr key={el.id} className="hover:bg-gray-50 transition-colors border-t">
                  <td className="px-4 py-3 font-medium text-gray-800 text-start">
                    {el.symbol}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-end">
                    {formatNumber(el.price)}
                  </td>
                  <td
                     className={`flex items-center justify-end px-4 py-3 text-end font-semibold ${
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
                  <td className="px-4 py-3 text-gray-400 text-xs text-start">
                    {formatDate(el.lastUpdated)}
                  </td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CardAsset;
