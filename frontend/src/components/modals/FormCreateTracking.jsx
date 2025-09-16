import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function FormCreateTracking({ onClose, onCreated }) {
    const { user } = useAuth();
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [type, setType] = useState("");
    const [assetId, setAssetId] = useState("");
    const [price, setPrice] = useState("");
    const [threshold, setThreshold] = useState("");
    const [direction, setDirection] = useState("above");
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/assets`)
            .then((res) => res.json())
            .then((data) => {
                setAssets(data)
                setFilteredAssets(data)
            })
            .catch(() => setAssets([]));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trackings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ assetId, price, threshold, direction, userId: user.id, }),
            });

            if (!res.ok) throw new Error("Failed to create tracking");
        
            const newTracking = await res.json();
            onCreated(newTracking);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error creating tracking");
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Create New Tracking
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                        </label>

                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                            value={type}
                            onChange={(e) => {
                                const value = e.target.value; 
                                setType(value);
                                setAssetId("");
                                setPrice("");
                                setFilteredAssets(assets.filter(el => el.type === value));
                            }}
                            required
                        >
                            <option value="" disabled>
                                Select type
                            </option>
                            <option value="crypto">Crypto</option>
                            <option value="fiat">Fiat</option>
                            <option value="commodity">Commodity</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Asset
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                            value={assetId}
                            onChange={(e) => {
                                setAssetId(e.target.value);
                                const currentPrice = assets.filter(el => el.id == e.target.value)[0].price || 0;
                                setPrice(currentPrice);
                            }}
                            required
                        >
                            <option value="" disabled>
                                Select asset
                            </option>
                            {filteredAssets.map((asset) => (
                                <option key={asset.id} value={asset.id}>
                                    {asset.name} ({asset.symbol})
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current price
                        </label>
                        <input
                            readOnly={true}
                            disabled={false}
                            value={price}
                            type="number"
                            step="0.01"
                            placeholder="Current price"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    {/* Threshold */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Threshold
                        </label>
                        <input
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            type="number"
                            step="0.01"
                            placeholder="Enter threshold"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    {/* Direction */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Direction
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            required
                        >
                            <option value="above">Above</option>
                            <option value="below">Below</option>
                        </select>
                    </div>
                    {/* Кнопки */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
