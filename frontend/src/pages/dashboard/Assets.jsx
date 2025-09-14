import { useEffect, useState } from "react";
import { Th, ThSort, Td } from "../../components/table/index.jsx";
import { PageTitle } from "./components/index.jsx";

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
        <>
            <PageTitle title="Assets"/>
            <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white">
                    <thead>
                        <tr>
                            <ThSort title="Name" field="name" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Symbol" field="symbol" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Type" field="type" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Data source" field="dataSource" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Price" field="price" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Previous Price" field="previousPrice" fn={ requestSort } sortConfig={ sortConfig } />
                            <ThSort title="Last Updated" field="lastUpdated" fn={ requestSort } sortConfig={ sortConfig } />
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                    { sortedAssets.map((asset) => (
                        <tr key={ asset.id } className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                            <Td title={ asset.name } weight="bold" />
                            <Td title={ asset.symbol } weight="bold" />
                            <Td title={ asset.type } />
                            <Td title={ asset.dataSource } />
                            <Td title={ asset.price } />
                            <Td title={ asset.previousPrice } />
                            <Td title={ asset.lastUpdated ? new Date(asset.lastUpdated).toLocaleString() : "-" } />
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
       </>  
    );
}

export default Assets;