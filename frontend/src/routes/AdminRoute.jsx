import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== "admin") {
        return <Navigate to="/dashboard/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;