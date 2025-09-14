import { useEffect, useState } from "react";
import { CirclePlus, Check } from 'lucide-react';
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";
import { Table, Thead, Tbody, Tr, ThSort, Td } from "../../components/table/index.jsx";
import PageTitle from "../../components/title/PageTitle.jsx";
import { CreateTrackingModal } from "../../components/modals/index.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx";

function Trackings() {
    const { user, token } = useAuth();
    const [trackings, setTrackings] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [showModal, setShowModal] = useState(false);

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
            console.error(err);
            toast.error("Failed to load trackings");
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchTrackings();
        }
    }, [user?.id]);

    const sortedTrackings = [...trackings].sort((a, b) => {
        if (!sortConfig.key) return 0;
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    async function handleCreate() {
        toast.success("Tracking added!");
        setShowModal(false);
        await fetchTrackings();
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <PageTitle title="Trackings" />
                <button
                    onClick={() => setShowModal(true)}
                    className="flex px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
                >
                    <CirclePlus className="w-5 h-5 mr-1" />Add Tracking
                </button>
            </div>

            <Table>
                <Thead>
                    <Tr>
                        <ThSort title="Asset" field="asset" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Threshold" field="threshold" fn={ requestSort } sortConfig={ sortConfig } textAlign="right" />
                        <ThSort title="Direction" field="direction" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Active" field="active" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Sent" field="notificationsSent" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Max notifications" field="maxNotifications" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Last Notified" field="lastNotifiedAt" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Interval (min)" field="notificationIntervalMinutes" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Created at" field="createdAt" fn={ requestSort } sortConfig={ sortConfig } />
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedTrackings.map((t) => (
                        <Tr key={t.id} zebra={ true }>
                            <Td weight="bold">{t.Asset?.name} ({t.Asset?.symbol})</Td>
                            <Td weight="bold" textAlign="right">{formatNumber(t.threshold)}</Td>
                            <Td>{t.direction}</Td>
                            <Td textAlign="center"> 
                                <input type="radio" checked={t.active} readOnly className="accent-teal-600" />
                            </Td>
                            <Td textAlign="center">{t.notificationsSent}</Td>
                            <Td textAlign="center">{t.maxNotifications}</Td>
                            <Td>{formatDate(t.lastNotifiedAt)}</Td>
                            <Td textAlign="center">{t.notificationIntervalMinutes}</Td>
                            <Td>{formatDate(t.createdAt)}</Td>
                        </Tr>
                    ))}
                </Tbody>    
            </Table>
            {showModal && (
                <CreateTrackingModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
            )}
        </>
    );
}

export default Trackings;
