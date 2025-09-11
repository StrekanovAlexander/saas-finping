import { useState } from "react";
import { CirclePlus } from 'lucide-react';
import Sidebar from "../../components/dashboard/Sidebar";
import TrackingsTable from "../../components/dashboard/TrackingsTable";
import Heading from "../../components/dashboard/elements/Heading";
import CreateTrackingModal from "../../components/dashboard/CreateTrackingModal";

function Trackings() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <Heading title="Trackings"/>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                    >
                        <CirclePlus className="w-5 h-5 mr-1" /> New Tracking
                    </button>
                </div>
                <TrackingsTable />
                {isModalOpen && (
                    <CreateTrackingModal onClose={() => setIsModalOpen(false)} />
                )}
            </div>
        </div>  
    );
}

export default Trackings;
