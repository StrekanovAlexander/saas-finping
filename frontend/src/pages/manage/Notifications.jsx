import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import { formatDate } from "../../utils/formats.jsx";

export default function Notifications() {
    const { user, token } = useAuth();
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [notifications, setNotifications] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [filterSource, setFilterSource] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const minutesAgo = Math.floor((new Date() - lastUpdated) / 60000);

    async function fetchNotifications() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load notifications");
            setNotifications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchNotifications();
        }
    }, [user?.id]);

    const filteredNotifications = notifications.filter((el) => {
        const matchesType = filterType ? el.Asset.type === filterType : true;
        const matchesSource = filterSource ? el.Asset.dataSource === filterSource : true;
        return matchesType && matchesSource;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            </div>
            <p className="text-gray-500 mb-6">
                Received messages 
            </p>
            {/* Filtering */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Notificated Trackings
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
                                    <th className="text-left py-3 px-4">Message</th>
                                    <th className="text-left py-3 px-4">Channel</th>
                                    <th className="text-left py-3 px-4">Created at</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map((t, idx) => (
                                    <tr
                                        key={idx}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <td className="py-3 px-4 font-medium">{t.Asset.name} ({t.Asset.symbol})</td>
                                        <td className="py-3 px-4 capitalize">{t.Asset.type}</td>
                                        <td className="py-3 px-4 capitalize">{t.Asset.dataSource}</td>
                                        <td className="py-3 px-4">{t.message}</td>
                                        <td className="py-3 px-4">{t.channel}</td>
                                        <td className="px-3 py-4 text-xs text-gray-400">{formatDate(t.createdAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-6 text-center text-gray-500 italic"
                                    >
                                        No notifications found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    * Each notification is stored for exactly one week from the date of its creation. After that, it is automatically deleted. 
                </p>
            </div>
            )}
        </div>
    );
}