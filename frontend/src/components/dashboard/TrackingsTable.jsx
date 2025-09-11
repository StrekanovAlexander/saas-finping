import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TrackingsTable() {
  const { user, token } = useAuth();
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatNumber = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  };

  useEffect(() => {
    async function fetchTrackings() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/trackings?userId=${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch trackings");
        const data = await res.json();
        setTrackings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) {
      fetchTrackings();
    }
  }, [user, token]);

  if (loading) return <p className="text-center py-4">Loading trackings...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Asset ID</th>
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
          {trackings.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No trackings found
              </td>
            </tr>
          ) : (
            trackings.map((t) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingsTable;
