import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx"; 
import AdminRoute from "./AdminRoute.jsx"; 
import { 
    Home, 
    HowItWorks,
    Contacts,
    Dashboard, 
    Login,
    Logout,
    Register,
    UserAccount, 
    Assets,
    Trackings,
    Settings,
    Users
} from "../pages/index.jsx";

export default function() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/logout"
                element={
                    <PrivateRoute>
                        <Logout />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard/account"
                element={
                    <PrivateRoute>
                        <UserAccount />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard/assets"
                element={
                    <PrivateRoute>
                        <Assets />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard/trackings"
                element={
                    <PrivateRoute>
                        <Trackings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/dashboard/settings"
                element={
                    <AdminRoute>
                        <Settings />
                    </AdminRoute>
                }
            />
            <Route 
                path="/dashboard/users" 
                element={
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                } 
            />
        </Routes>
    );
}