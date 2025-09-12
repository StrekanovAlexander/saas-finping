import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx"; 
import { 
    Home, 
    HowItWorks,
    Contacts,
    Dashboard, 
    // SignIn, 
    // SignUp,
    // SignOut,
    UserAccount, 
    Assets,
    Trackings,
    Settings
} from "../pages/index.jsx";

export default function() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contacts" element={<Contacts />} />
            {/* <Route path="/user/sign-in" element={<SignIn />} /> */}
            {/* <Route path="/user/sign-up" element={<SignUp />} /> */}
            <Route
                path="/dashboard/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            {/* <Route
                path="/user/sign-out"
                element={
                    <PrivateRoute>
                        <SignOut />
                    </PrivateRoute>
                }
            /> */}
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
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}