import { Link, useLocation } from "react-router-dom";
import { Home, User, BarChart2, Settings } from "lucide-react";

function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/user/dashboard", icon: <Home size={18} /> },
        { name: "My Account", path: "/user/account", icon: <User size={18} /> },
        { name: "Trackings", path: "/user/trackings", icon: <BarChart2 size={18} /> },
        { name: "Settings", path: "/user/settings", icon: <Settings size={18} /> },
    ];

    return (
        <div className="w-64 bg-white border-r shadow-md p-4">
            <h2 className="text-xl font-bold mb-6">FinPing</h2>
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
            </nav>
        </div>
    );
}

export default Sidebar;
