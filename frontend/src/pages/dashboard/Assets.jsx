import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, ThSort, Td } from "../../components/table/index.jsx";
import PageTitle from "../../components/title/PageTitle.jsx";
import { formatDate, formatNumber } from "../../utils/formats.jsx";

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

    if (loading) return <p className="text-center py-10">Loading assets...</p>;

    return (
        <>
            <PageTitle title="Assets"/>
            <Table>
                <Thead>
                    <Tr>
                        <ThSort title="Name" field="name" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Symbol" field="symbol" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Type" field="type" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Data source" field="dataSource" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Price" field="price" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Previous Price" field="previousPrice" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Last Updated" field="lastUpdated" fn={ requestSort } sortConfig={ sortConfig } />
                    </Tr>
                </Thead>
                <Tbody>
                    { sortedAssets.map((asset) => (
                        <Tr key={ asset.id } zebra={ true }>
                            <Td title={ asset.name } weight="bold" />
                            <Td title={ asset.symbol } weight="bold" />
                            <Td title={ asset.type } />
                            <Td title={ asset.dataSource } />
                            <Td title={ formatNumber(asset.price) } />
                            <Td title={ formatNumber(asset.previousPrice) } />
                            <Td title={ formatDate(asset.lastUpdated) } />
                        </Tr>
                    ))}
                </Tbody>
            </Table>
       </>  
    );
}

export default Assets;