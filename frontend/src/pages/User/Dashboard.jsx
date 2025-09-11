import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TrackingsList from "../../components/dashboard/TrackingsList";
import CreateTrackingModal from "../../components/dashboard/CreateTrackingModal";

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Trackings</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                        + New Tracking
                    </button>
                </div>

                <TrackingsList />

                {isModalOpen && (
                    <CreateTrackingModal onClose={() => setIsModalOpen(false)} />
                )}
            </div>
        </div>    
    )
}

export default Dashboard;