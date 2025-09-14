import { useEffect, useState } from "react";
import { Check } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import PageTitle from "../../components/title/PageTitle.jsx";
import { Table, Thead, Tbody, Tr, ThSort, Th, Td } from "../../components/table/index.jsx";
import { formatDate } from "../../utils/formats.jsx";

function Users() {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    
    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error ${res.status}`);
                }

                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching assets:", err);
            } finally {
                setLoading(false);
            }
        }
    
        fetchUsers();
    }, []);
    
    const sortedUsers = [...users].sort((a, b) => {
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
    
    if (loading) return <p className="text-center py-10">Loading users...</p>;
    
    return (
        <>
            <PageTitle title="Users"/>
            <Table>
                <Thead>
                    <Tr>
                        <ThSort title="Email" field="email" fn={ requestSort } sortConfig={ sortConfig } />
                        <ThSort title="Is Admin" field="role" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Subscribe" field="subscribe" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Active" field="active" fn={ requestSort } sortConfig={ sortConfig } textAlign="center" />
                        <ThSort title="Created at" field="createdAt" fn={ requestSort } sortConfig={ sortConfig } />
                        <Th title="Action" textAlign="center" />
                    </Tr>
                </Thead>
                <Tbody>
                    { sortedUsers.map((el) => (
                        <Tr key={ el.id } zebra={ true }>
                            <Td weight="bold">{ el.email }</Td>
                            <Td textAlign="center">
                                <input type="radio" checked={el.role === "admin"} readOnly className="accent-teal-600" />
                            </Td>
                            <Td textAlign="center">
                                <input type="radio" checked={el.subscribe} readOnly className="accent-teal-600" />
                            </Td>
                            <Td textAlign="center"> 
                                <input type="radio" checked={el.active} readOnly className="accent-teal-600" />
                            </Td>
                            <Td>{ formatDate(el.createdAt) }</Td>
                            <Td textAlign="center">
                                <button type="button" class="px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-yellow-500 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                    Delete
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}

export default Users;