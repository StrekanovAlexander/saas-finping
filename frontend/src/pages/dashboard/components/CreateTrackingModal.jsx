import { useState, useEffect } from "react";
import { CircleX, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

function CreateTrackingModal({ onClose, onCreate }) {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [threshold, setThreshold] = useState("");
  const [direction, setDirection] = useState("above");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/assets`);
        const data = await res.json();
        setAssets(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load assets");
      }
    }
    fetchAssets();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/trackings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId, threshold, direction, userId: user.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create tracking");

      onCreate(); 
    } catch (err) {
      console.error(err);
      toast.error("Error creating tracking");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">New Tracking</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Select Asset */}
          <select
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.symbol})
              </option>
            ))}
          </select>
          {/* Threshold */}
          <input
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {/* Direction */}
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm rounded-lg"
              disabled={loading}
            >
              <CircleX className="w-5 h-5 mr-1" />Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              disabled={loading}
            >
              <Save className="w-5 h-5 mr-1" />{loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTrackingModal;