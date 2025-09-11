import { useEffect, useState } from "react";
import { CirclePlus, CheckCircle, XCircle } from 'lucide-react';
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { PageTitle, Sidebar, CreateTrackingModal } from "./components";

const formatNumber = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
    }).format(value);
};

function Trackings() {
    const { user } = useAuth();
    const [trackings, setTrackings] = useState([]);
    const [showModal, setShowModal] = useState(false);

    async function fetchTrackings() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trackings/user/${user.id}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load trackings");
            setTrackings(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load trackings");
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchTrackings();
        }
    }, [user?.id]);

    async function handleCreate() {
        toast.success("Tracking added!");
        setShowModal(false);
        await fetchTrackings();
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <PageTitle title="Trackings" />
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                    >
                        <CirclePlus className="w-5 h-5 mr-1" />Add Tracking
                    </button>
                </div>

                <table className="w-full border rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Asset</th>
                            <th className="px-4 py-2 text-left">Threshold</th>
                            <th className="px-4 py-2 text-left">Direction</th>
                            <th className="px-4 py-2 text-left">Channel</th>
                            <th className="px-4 py-2 text-left">Active</th>
                            <th className="px-4 py-2 text-left">Sent</th>
                            <th className="px-4 py-2 text-left">Max</th>
                            <th className="px-4 py-2 text-left">Last Notified</th>
                            <th className="px-4 py-2 text-left">Interval (min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trackings.map((t) => (
                        <tr key={t.id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2">{t.Asset?.name} ({t.Asset?.symbol})</td>
                    <td className="px-4 py-2">{formatNumber(t.threshold)}</td>
                    <td className="px-4 py-2">{t.direction}</td>
                    <td className="px-4 py-2">{t.channel}</td>
                    <td className="px-4 py-2">
                    { t.active 
                        ? <CheckCircle className="text-green-500 ml-2 w-5 h-5" /> 
                        : <XCircle className="text-red-500 ml-2 w-5 h-5" />
                    }
                    </td>
                    <td className="px-4 py-2">{t.notificationsSent}</td>
                    <td className="px-4 py-2">{t.maxNotifications}</td>
                    <td className="px-4 py-2">
                    {t.lastNotifiedAt
                        ? new Date(t.lastNotifiedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2">{t.notificationIntervalMinutes}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                {showModal && (
                    <CreateTrackingModal
                        onClose={() => setShowModal(false)}
                        onCreate={handleCreate}
                    />
                )}
            </div>
        </div>
    );
}

export default Trackings;
