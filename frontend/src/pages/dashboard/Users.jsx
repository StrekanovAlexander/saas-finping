import { useEffect, useState } from "react";
import { Check, X, UserCog, User } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import { PageTitle } from "./components/index.jsx";
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
    
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "▲" : "▼";
        }
        return "";
    };
    
    if (loading) return <p className="text-center py-10">Loading users...</p>;
    
    return (
            <>
                <PageTitle title="Users"/>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-sm">
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("email")}
                                    >
                                        Email {getSortIndicator("email")}
                                    </th>
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("role")}
                                    >
                                        Role {getSortIndicator("role")}
                                    </th>
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("active")}
                                    >
                                        Activity {getSortIndicator("active")}
                                    </th>
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("subscribe")}
                                    >
                                        Subscribed {getSortIndicator("subscribe")}
                                    </th>
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("createdAt")}
                                    >
                                        Created at {getSortIndicator("createdAt")}
                                    </th>
                                    <th
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={() => requestSort("updatedAt")}
                                    >
                                        Updated at {getSortIndicator("updatedAt")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {sortedUsers.map((el) => (
                                <tr key={el.id} className="border-t hover:bg-gray-50 text-sm">
                                    <td className="px-4 py-2">{ el.email }</td>
                                    <td className="px-4 py-2">
                                        { el.role === 'admin'
                                            ? <UserCog className="text-gray-700 w-5 h-5" />
                                            : <User className="text-gray-500 w-5 h-5" />
                                        }
                                    </td>
                                    <td className="px-4 py-2 flex items-center">
                                        { el.active 
                                            ? <Check className="text-green-500 w-5 h-5" /> 
                                            : <X className="text-gray-500 w-5 h-5" />
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        { el.subscribe
                                            ? <Check className="text-green-500 w-5 h-5" /> 
                                            : <X className="text-gray-500 w-5 h-5" /> 
                                        }
                                    </td> 
                                    <td className="px-4 py-2">{ formatDate(el.createdAt) }</td>
                                    <td className="px-4 py-2">{ formatDate(el.updatedAt) }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
    );
}

export default Users;