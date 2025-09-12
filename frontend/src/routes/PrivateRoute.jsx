import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function PrivateRoute({ children }) {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/user/sign-in" replace />;
    }

    return children;
}

export default PrivateRoute;
