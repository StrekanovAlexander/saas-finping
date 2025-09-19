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
              <th className="px-4 py-3 font-medium text-start hidden sm:table-cell">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              const isUp = el.price > el.previousPrice;
              const isDown = el.price < el.previousPrice;
              const change = el.price - el.previousPrice;
              const percent = ((change / el.previousPrice) * 100).toPrecision(3);
              return (
                <tr key={el.id} className="hover:bg-gray-50 transition-colors border-t">
                  <td className="px-4 py-3 font-medium text-gray-800 text-start">
                    {el.symbol}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-end">
                    {formatNumber(el.price)}
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
                  <td className="px-4 py-3 text-gray-400 text-xs text-start hidden sm:table-cell">
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
