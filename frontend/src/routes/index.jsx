import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx"; 
import AdminRoute from "./AdminRoute.jsx"; 
import ControlPanelRoute from "./ControlPanelRoute.jsx"; 
import { PublicLayout, PrivateLayout, ControlPanelLayout } from "../components/layouts/index.jsx";
import { 
    Home, 
    HowItWorks,
    Contacts,
    AssetsPage,
    AboutPage,
    Login,
    Logout,
    Register,
    Account, 
    Notifications,
    Trackings,
    Users
} from "../pages/index.jsx";

export default function() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/assets" element={<AssetsPage />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ControlPanelRoute />}>
                <Route element={<ControlPanelLayout />}>
                    <Route path="/manage/account" element={<Account />} />
                    <Route path="/manage/notifications" element={<Notifications />} />
                    <Route path="/manage/trackings" element={<Trackings />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute />}>
                <Route element={<PrivateLayout />}>
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Route>

            <Route element={<AdminRoute />}>
                <Route element={<PrivateLayout />}>
                    <Route path="/manage/users" element={<Users />} />
                </Route>
            </Route>
        </Routes>
    );
}