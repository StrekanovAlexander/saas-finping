import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function PrivateRoute() {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
