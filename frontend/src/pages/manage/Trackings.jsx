import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import FormCreateTracking from "../../components/modals/FormCreateTracking.jsx";
import FormDeleteTracking from "../../components/modals/FormDeleteTracking.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx";

export default function Trackings() {
    const { user, token } = useAuth();
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterSource, setFilterSource] = useState("");
    const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
    const [isFormDeleteOpen, setIsFormDeleteOpen] = useState(false);
    const [tracking, setTracking] = useState(null);
    const [trackings, setTrackings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    async function fetchTrackings() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trackings/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load trackings");
            setTrackings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchTrackings();
        }
    }, [user?.id]);

    const filteredTrackings = trackings.filter((t) => {
        const matchesSearch = 
            t.Asset.name.toLowerCase().includes(search.toLowerCase()) ||
            t.Asset.symbol.toLowerCase().includes(search.toLowerCase());
            const matchesType = filterType ? t.Asset.type === filterType : true;
            const matchesSource = filterSource ? t.Asset.dataSource === filterSource : true;
            return matchesSearch && matchesType && matchesSource;
    });
    
    const minutesAgo = Math.floor((new Date() - lastUpdated) / 60000);

    async function handleDelete(tracking) {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trackings/${tracking.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete tracking");
            }
            fetchTrackings();
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsFormDeleteOpen(false);
        }
        setIsFormDeleteOpen(false);
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">Trackings</h1>
                <button
                    onClick={() => setIsFormCreateOpen(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                >
                    + Add Tracking
                </button>
            </div>
            <p className="text-gray-500 mb-6">
                Your active alerts and tracked assets
            </p>
            {/* Filtering */}
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
                        <option value="yahoo">Yahoo Finance</option>
                        <option value="fxrates">FXRates</option>
                    </select>
                </div>
            </div>
            {loading && <div><Spinner /></div>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {/* Table */}
            {!loading && !error && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Tracked Assets
                        </h2>
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
                                    <th className="text-left py-3 px-4">Type</th>
                                    <th className="text-left py-3 px-4">Source</th>
                                    <th className="text-right py-3 px-4">Price</th>
                                    <th className="text-right py-3 px-4">Threshold</th>
                                    <th className="text-center py-3 px-4">Direction</th>
                                    <th className="text-center py-3 px-4">Active</th>
                                    <th className="text-left py-3 px-4">Last Updated</th>
                                    <th className="text-left py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                            {filteredTrackings.length > 0 ? (
                                filteredTrackings.map((t, idx) => (
                                    <tr
                                        key={idx}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <td className="py-3 px-4 font-medium">{t.Asset.name} ({t.Asset.symbol})</td>
                                        <td className="py-3 px-4 capitalize">{t.Asset.type}</td>
                                        <td className="py-3 px-4 capitalize">{t.Asset.dataSource}</td>
                                        <td className="py-3 px-4 text-right">
                                            {formatNumber(t.price)}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            {formatNumber(t.threshold)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {t.direction === "above" && (
                                                <span className="text-teal-600 font-medium">
                                                    {t.direction}
                                                </span>
                                            )}
                                            {t.direction === "below" && (
                                                <span className="text-red-600 font-medium">
                                                    {t.direction}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input type="radio" checked={t.active} readOnly className="accent-teal-600" />
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs text-left">{formatDate(t.updatedAt)}</td>
                                            <td>
                                                <Trash2 
                                                    className="w-5 h-5 text-gray-400 hover:text-orange-500 hover:cursor-pointer" 
                                                    onClick={() => {
                                                        setTracking(t);
                                                        setIsFormDeleteOpen(true);
                                                    }}
                                                />
                                            </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-6 text-center text-gray-500 italic"
                                    >
                                        No trackings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
            {isFormCreateOpen && (
                <FormCreateTracking 
                    onClose={() => setIsFormCreateOpen(false)} 
                    onCreated={() => fetchTrackings()}
                />
            )}
            {isFormDeleteOpen && (
                <FormDeleteTracking 
                    onClose={() => setIsFormDeleteOpen(false)} 
                    onConfirm={handleDelete}
                    tracking={tracking}
                />
            )}
        </div>
    );
}
