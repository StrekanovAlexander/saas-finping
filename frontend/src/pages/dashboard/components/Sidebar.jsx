import { Link, useLocation } from "react-router-dom";
import { Home, User, BarChart2, Settings, Layers, Users  } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";

function Sidebar() {
    const location = useLocation();
    const { user } = useAuth();

    const navItems = [
        { name: "Dashboard", path: "/dashboard/dashboard", icon: <Home size={18} /> },
        { name: "Trackings", path: "/dashboard/trackings", icon: <BarChart2 size={18} /> },
        { name: "Assets", path: "/dashboard/assets", icon: <Layers size={18} /> },
        { name: "Account", path: "/dashboard/account", icon: <User size={18} /> },
    ];

    const adminItems = [
        { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
        { name: "Users", path: "/dashboard/users", icon: <Users size={18} /> },
    ];

    return (
        <div className="w-64 bg-white border-r shadow-md p-4">
            <h2 className="text-xl font-bold mb-6">Control panel</h2>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-lg ${
                            location.pathname === item.path
                            ? "bg-emerald-100 text-emerald-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                    </Link>
                ))}
                {user?.role === "admin" && (
                    <>
                    <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-500">Admin</h3>
                        {adminItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-3 py-2 rounded-lg ${
                                    location.pathname === item.path
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        ))}
                    </>
                )}    
            </nav>
        </div>
    );
}

export default Sidebar;
