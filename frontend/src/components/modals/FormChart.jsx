import { useEffect, useState } from "react";
import AssetPriceChart from "../chart/AssetPriceChart.jsx";
import Spinner from "../spinner/Spinner.jsx";

export default function FormChart({ item, onClose }) {
    const [assetPrices, setAssetPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAssetPrices() {
            try {
                const url = `${import.meta.env.VITE_API_URL}/asset-prices/${item.id}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch assets prices");
                const data = await res.json();
                setAssetPrices(data);
                } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAssetPrices();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        {item.name} {" ("} {item.symbol} {") "}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-1 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>
                {loading && <div><Spinner /></div>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                <div className="h-[400px] sm:h-[500px]">
                    <AssetPriceChart data={assetPrices} />
                </div>
                )}
            </div>
        </div>
    );
}
