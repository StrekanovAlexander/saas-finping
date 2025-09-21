import { useState } from "react";
import { BarChart3 } from "lucide-react";
import FormChart from "../modals/FormChart.jsx";
import Icon from "./Icon.jsx";
import Trend from "./Trend.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx";

function Card({ item }) {
    const [isFormChartOpen, setIsFormChartOpen] = useState(false);

    return (
        <div className="rounded-2xl shadow p-4 flex flex-col justify-between hover:shadow-xl transition bg-white h-28">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-2/3">
                    <Icon icon={item.icon} />
                    <div className="truncate">
                        <p className="font-semibold text-gray-800 leading-tight line-clamp-2 break-words">
                            {item.name}
                        </p>
                        <span className="text-sm text-gray-500">{item.symbol}</span>
                    </div>
                </div>
                <div className="text-right w-1/2 flex-shrink-0">
                    <p className="text-lg font-bold">{formatNumber(item.price)}</p>
                    <Trend price={item.price} previousPrice={item.previousPrice} />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setIsFormChartOpen(true)}
                    className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 
                    rounded-lg shadow-sm hover:bg-gray-50 hover:border-teal-500 
                    text-gray-700 transition focus:outline-none focus:ring-2 
                    focus:ring-teal-500 focus:ring-offset-1"
                >
                    <BarChart3 className="w-5 h-5 mr-2 text-teal-600" />
                    <span className="text-sm">View Chart</span>
                </button>
                <span className="text-xs text-gray-400">
                    {formatDate(item.lastUpdated)}
                </span>
            </div>
            {isFormChartOpen && (
                <FormChart 
                    item={item}
                    onClose={() => setIsFormChartOpen(false)} 
                />
            )}
        </div>
    )   
};

export default Card;
