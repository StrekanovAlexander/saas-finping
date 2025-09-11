import { useEffect, useState } from "react";
import { PageTitle, Sidebar } from "./components";

const formatNumber = (value) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
    }).format(value);
};

function Assets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        async function fetchAssets() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/assets`);
                const data = await res.json();
                setAssets(data);
            } catch (err) {
                console.error("Error fetching assets:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAssets();
    }, []);

    const sortedAssets = [...assets].sort((a, b) => {
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

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "▲" : "▼";
        }
        return "";
    };

    if (loading) return <p className="text-center py-10">Loading assets...</p>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <PageTitle title="Assets"/>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="text-left">
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("name")}
                                >
                                    Name {getSortIndicator("name")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("symbol")}
                                >
                                    Symbol {getSortIndicator("symbol")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("type")}
                                >
                                    Type {getSortIndicator("type")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("dataSource")}
                                >
                                    Data Source {getSortIndicator("dataSource")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("price")}
                                >
                                    Price {getSortIndicator("price")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("previousPrice")}
                                >
                                    Previous Price {getSortIndicator("previousPrice")}
                                </th>
                                <th
                                    className="px-4 py-2 cursor-pointer"
                                    onClick={() => requestSort("lastUpdated")}
                                >
                                    Last Updated {getSortIndicator("lastUpdated")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAssets.map((asset) => (
                                <tr key={asset.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{ asset.name }</td>
                                    <td className="px-4 py-2">{ asset.symbol }</td>
                                    <td className="px-4 py-2">{ asset.type }</td>
                                    <td className="px-4 py-2">{ asset.dataSource }</td>
                                    <td className="px-4 py-2">{ formatNumber(asset.price) }</td>
                                    <td className="px-4 py-2">{ formatNumber(asset.previousPrice) }</td>
                                    <td className="px-4 py-2">
                                        {asset.lastUpdated ? new Date(asset.lastUpdated).toLocaleString() : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
    );
}

export default Assets;