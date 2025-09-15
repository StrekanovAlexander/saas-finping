import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ControlPanelRoute() {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ControlPanelRoute;