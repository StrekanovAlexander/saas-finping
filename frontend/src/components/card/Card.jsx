import Icon from "./Icon.jsx";
import Trend from "./Trend.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx";

function Card({ item }) {
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
            <p className="text-center text-xs text-gray-400 mt-1">
                {formatDate(item.lastUpdated)}
            </p>
        </div>
    )   
};

export default Card;
