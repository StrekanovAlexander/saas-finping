// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
import { formatNumber } from "../../utils/formats.jsx";

export default function FormDeleteTracking({ onClose, onConfirm, tracking }) {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Delete Tracking
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete item<br/> 
                    <span className="font-semibold">
                        {tracking.Asset.name} ({tracking.Asset.symbol}). 
                        Threshold: {formatNumber(tracking.threshold)}
                    </span>?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(tracking)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
