import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function Trend({ price, previousPrice}) {
    const isUp = price > previousPrice;
    const isDown = price < previousPrice;
    const change = price - previousPrice;
    const percent = ((change / previousPrice) * 100).toPrecision(3);
    return (
        <>
            {isUp && (
                <span className="flex items-center justify-end text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    { percent }%
                </span>
            )}
            {isDown && (
                <span className="flex items-center justify-end text-sm text-red-600">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    { percent }%
                </span>
            )}
            {!isUp && !isDown && (
                <span className="flex items-center justify-end text-sm text-gray-500">No change</span>
            )}
        </>
    )
}

export default Trend;