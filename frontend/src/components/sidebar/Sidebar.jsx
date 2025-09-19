import { Link, useLocation } from "react-router-dom";
import { BarChart2, BellRing, User, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const navItems = [
  { name: "Trackings", path: "/manage/trackings", icon: <BarChart2 size={18} /> },
  { name: "Notifications", path: "/manage/notifications", icon: <BellRing size={18} /> },
  { name: "Account", path: "/manage/account", icon: <User size={18} /> }
];

const navAdminItems = [
  { name: "Users", path: "/manage/users", icon: <Users size={18} /> }
];

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-full mb-4 md:w-64 bg-white rounded-2xl shadow-md flex flex-col flex-shrink-0 self-start">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-teal-600">Control Panel</h3>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 text-gray-700">
        {navItems.map((el) => (
          <Link
            key={el.path}
            to={el.path}
            className={`flex items-center px-3 py-2 rounded-lg ${
            location.pathname === el.path
              ? "bg-teal-100 text-teal-700"
              : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {el.icon}
            <span className="ml-3">{el.name}</span>
          </Link>
        ))}
        {user.role === "admin" && (
          navAdminItems.map((el) => (
          <Link
            key={el.path}
            to={el.path}
            className={`flex items-center px-3 py-2 rounded-lg ${
            location.pathname === el.path
              ? "bg-teal-100 text-teal-700"
              : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {el.icon}
            <span className="ml-3">{el.name}</span>
          </Link>
        )))}
      </nav>
      <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-400">
        &copy; { new Date().getFullYear() } FinPing
      </div>
    </aside>
  );
}

export default Sidebar;
